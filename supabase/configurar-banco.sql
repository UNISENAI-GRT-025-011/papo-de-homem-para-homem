-- Execute todo este arquivo uma única vez no SQL Editor do Supabase.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  role text not null default 'usuario' check (role in ('usuario', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  url_video text not null,
  categoria text,
  created_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  created_at timestamptz not null default now()
);

create table if not exists public.perguntas (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  pergunta text not null,
  opcoes jsonb not null check (jsonb_typeof(opcoes) = 'array'),
  resposta_correta integer not null check (resposta_correta >= 0),
  explicacao text,
  ordem integer not null default 0
);

alter table public.perguntas add column if not exists ordem integer not null default 0;
create index if not exists perguntas_quiz_id_idx on public.perguntas(quiz_id);
create unique index if not exists perguntas_quiz_ordem_idx on public.perguntas(quiz_id, ordem);

alter table public.profiles enable row level security;
alter table public.videos enable row level security;
alter table public.quizzes enable row level security;
alter table public.perguntas enable row level security;

grant select on public.videos, public.quizzes, public.perguntas to anon, authenticated;
grant select on public.profiles to authenticated;
revoke update on public.profiles from authenticated;
grant update (nome) on public.profiles to authenticated;

drop policy if exists "Leitura publica de videos" on public.videos;
create policy "Leitura publica de videos" on public.videos for select to anon, authenticated using (true);
drop policy if exists "Leitura publica de quizzes" on public.quizzes;
create policy "Leitura publica de quizzes" on public.quizzes for select to anon, authenticated using (true);
drop policy if exists "Leitura publica de perguntas" on public.perguntas;
create policy "Leitura publica de perguntas" on public.perguntas for select to anon, authenticated using (true);
drop policy if exists "Usuario le o proprio perfil" on public.profiles;
create policy "Usuario le o proprio perfil" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "Usuario altera o proprio nome" on public.profiles;
create policy "Usuario altera o proprio nome" on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.criar_perfil_do_usuario()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nome)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nome', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario after insert on auth.users
for each row execute procedure public.criar_perfil_do_usuario();

-- Insere o quiz inicial apenas se ele ainda não existir.
do $$
declare qid uuid;
begin
  select id into qid from public.quizzes where titulo = 'Conhecimentos e prevenção' limit 1;
  if qid is null then
    insert into public.quizzes (titulo, descricao)
    values ('Conhecimentos e prevenção', 'Quiz educativo do projeto Papo de Homem para Homem')
    returning id into qid;

    insert into public.perguntas (quiz_id, pergunta, opcoes, resposta_correta, explicacao, ordem) values
    (qid, 'O feminicídio considera qualquer assassinato de mulher como feminicídio, independentemente da motivação?', '["Verdadeiro","Falso"]', 1, 'A caracterização depende das circunstâncias previstas em lei.', 1),
    (qid, 'A Lei Maria da Penha prevê medidas protetivas de urgência, como afastamento e proibição de contato?', '["Verdadeiro","Falso"]', 0, 'A lei prevê medidas protetivas de urgência.', 2),
    (qid, 'O atendimento previsto na Lei do Minuto Seguinte depende da apresentação prévia de boletim de ocorrência?', '["Sim","Não"]', 1, 'O atendimento de saúde não depende de boletim de ocorrência.', 3),
    (qid, 'A perseguição repetitiva pode ocorrer tanto presencialmente quanto no ambiente digital?', '["Verdadeiro","Falso"]', 0, 'A perseguição também pode ocorrer por meios digitais.', 4),
    (qid, 'A invasão não autorizada de dispositivo informático pode configurar crime?', '["Verdadeiro","Falso"]', 0, 'A legislação brasileira tipifica a invasão de dispositivo informático.', 5),
    (qid, 'Dizer que algo foi uma brincadeira elimina automaticamente o constrangimento causado?', '["Verdadeiro","Falso"]', 1, 'A intenção alegada não elimina automaticamente o impacto da conduta.', 6),
    (qid, 'O sinal de um X vermelho na mão pode ser usado como pedido silencioso de ajuda?', '["Verdadeiro","Falso"]', 0, 'O Sinal Vermelho é uma forma silenciosa de pedir ajuda.', 7),
    (qid, 'A Polícia Federal pode investigar misoginia na internet quando houver repercussão interestadual ou internacional?', '["Verdadeiro","Falso"]', 0, 'A Lei nº 13.642/2018 atribuiu essa competência nas hipóteses legais.', 8),
    (qid, 'A invasão de computador só é crime quando a vítima é uma pessoa pública?', '["Verdadeiro","Falso"]', 1, 'A proteção legal não se limita a pessoas públicas.', 9);
  end if;
end $$;
