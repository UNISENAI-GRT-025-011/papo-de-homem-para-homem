# Guia de instalação — somente etapas manuais

Todo o código, as regras de segurança e os dados iniciais já estão preparados.
Você precisa apenas vincular o seu projeto Supabase.

## 1. Executar o SQL no Supabase

1. Entre em **Supabase > seu projeto > SQL Editor**.
2. Clique em **New query**.
3. Abra neste projeto o arquivo `supabase/configurar-banco.sql`.
4. Copie todo o conteúdo, cole no SQL Editor e clique em **Run**.

O script pode ser executado novamente sem duplicar o quiz inicial. Ele cria ou
ajusta as tabelas, relacionamento, índice, RLS, políticas de leitura e perfil
automático de novos usuários.

## 2. Copiar somente as credenciais públicas

1. No Supabase, abra **Project Settings > API** (em algumas versões:
   **Settings > API Keys**).
2. Copie a **Project URL**.
3. Copie a chave pública **anon / publishable**.
4. Na pasta do projeto, faça uma cópia de `.env.example` com o nome `.env`.
5. Preencha:

```env
PORT=3000
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
```

Não use nem compartilhe a chave `service_role`/`secret`. Ela não é necessária.
O arquivo `.env` já está ignorado pelo Git e não está incluído no ZIP.

## 3. Instalar e abrir

No Windows, extraia o ZIP, abra a pasta `meu-projeto-phph-supabase` no terminal
e confira se o terminal está na pasta que contém `package.json`. Execute:

```bash
npm install
npm start
```

Abra `http://localhost:3000` no navegador. Não abra o HTML com dois cliques,
pois a API precisa do servidor Node em execução.

## 4. Conferir

- Abra `http://localhost:3000/api/health`: deve aparecer `{"ok":true}`.
- Abra `http://localhost:3000/informacoes/quizes.html`: as perguntas devem vir
  do Supabase.
- Para cadastrar vídeos, use **Table Editor > videos > Insert row**. Preencha
  `titulo` e `url_video`; os demais campos são opcionais.

## Segurança já aplicada

- nenhuma credencial administrativa vai ao navegador;
- RLS ativado em todas as tabelas;
- visitantes possuem somente leitura do conteúdo educativo;
- perfis só podem ser lidos pelo próprio usuário autenticado;
- limites de requisições, tamanho de entrada e cabeçalhos de segurança;
- mensagens internas do banco não são expostas ao visitante;
- `.env` e `node_modules` não entram no ZIP/Git.

## Observação sobre edição de conteúdo

Cadastre e edite quizzes, perguntas e vídeos pelo Table Editor do Supabase.
Não foi criada uma área administrativa pública, pois isso exigiria autenticação,
controle de função e cuidados adicionais. A página pública permanece somente
para leitura.
