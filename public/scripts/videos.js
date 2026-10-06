// Espaço reservado para controles de vídeos.
// Exemplo: play/pause, carrossel, acessibilidade e carregamento sob demanda.
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');

  videos.forEach((video) => {
    video.addEventListener('play', () => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video) otherVideo.pause();
      });
    });
  });
});
