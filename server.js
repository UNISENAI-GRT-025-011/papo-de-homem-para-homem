require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    })
  : null;

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      mediaSrc: ["'self'", 'https:'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use('/api', rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false
}));

app.use(express.static(PUBLIC_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

function requireSupabase(req, res, next) {
  if (!supabase) {
    return res.status(503).json({
      error: 'Banco ainda não configurado. Preencha SUPABASE_URL e SUPABASE_ANON_KEY no arquivo .env.'
    });
  }
  next();
}

app.get('/api/health', requireSupabase, async (req, res) => {
  const { error } = await supabase.from('quizzes').select('id', { head: true, count: 'exact' });
  if (error) return res.status(503).json({ ok: false, error: 'Supabase indisponível ou SQL ainda não executado.' });
  res.json({ ok: true });
});

app.get('/api/videos', requireSupabase, async (req, res) => {
  const { data, error } = await supabase
    .from('videos')
    .select('id,titulo,descricao,url_video,categoria,created_at')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: 'Não foi possível carregar os vídeos.' });
  res.json(data);
});

app.get('/api/quizzes', requireSupabase, async (req, res) => {
  const { data, error } = await supabase
    .from('quizzes')
    .select('id,titulo,descricao,created_at')
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: 'Não foi possível carregar os quizzes.' });
  res.json(data);
});

app.get('/api/quizzes/:id/perguntas', requireSupabase, async (req, res) => {
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuid.test(req.params.id)) return res.status(400).json({ error: 'Quiz inválido.' });

  const { data, error } = await supabase
    .from('perguntas')
    .select('id,pergunta,opcoes,resposta_correta,explicacao,ordem')
    .eq('quiz_id', req.params.id)
    .order('ordem', { ascending: true });

  if (error) return res.status(500).json({ error: 'Não foi possível carregar as perguntas.' });
  res.json(data);
});

app.use((req, res) => {
  res.status(404).send('Página não encontrada.');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  if (!supabase) console.warn('⚠️ Supabase ainda não configurado. Consulte GUIA-DE-INSTALACAO.md.');
});
