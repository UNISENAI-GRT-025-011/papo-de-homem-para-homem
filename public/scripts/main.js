// JavaScript geral do site.
// Funcionalidades compartilhadas entre as páginas podem ser adicionadas aqui.
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('[data-current-year]');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// ---------------------------------------------------------------------------
// SUPABASE NO FRONT-END (FUTURO E OPCIONAL)
// ---------------------------------------------------------------------------
// Prefira chamar rotas do próprio servidor em /api.
// Caso o cliente Supabase seja usado diretamente no navegador, exponha apenas
// a URL pública e a chave ANON. Nunca exponha a chave SERVICE_ROLE.
