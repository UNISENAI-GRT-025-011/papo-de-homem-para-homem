const videoData = [
    { id: '47TG6-Zjxbc', title: 'Vídeo 1' },
    { id: 'suLxme_-yn4', title: 'Vídeo 2' },
    { id: 'juG4GYp6URE', title: 'Vídeo 3' },
    { id: 'YlDg44uOSdE', title: 'Short' }
];

function getYouTubeThumbnail(videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYouTubeThumbnailFallback(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function createVideoSlide(video, index) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.dataset.index = index;

    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';

    const thumbnail = document.createElement('img');
    thumbnail.src = getYouTubeThumbnail(video.id);
    thumbnail.alt = video.title;
    thumbnail.className = 'thumbnail';
    thumbnail.loading = 'lazy';
    
    thumbnail.onerror = function() {
        this.src = getYouTubeThumbnailFallback(video.id);
    };

    const playBtn = document.createElement('button');
    playBtn.className = 'play-btn';
    playBtn.setAttribute('aria-label', `Reproduzir ${video.title}`);

    const label = document.createElement('div');
    label.className = 'video-label';
    label.textContent = video.title;

    slide.appendChild(wrapper);
    wrapper.appendChild(thumbnail);
    wrapper.appendChild(playBtn);
    wrapper.appendChild(label);

    playBtn.addEventListener('click', () => loadVideo(wrapper, video.id));

    return slide;
}

function loadVideo(wrapper, videoId) {
    const thumbnail = wrapper.querySelector('.thumbnail');
    const playBtn = wrapper.querySelector('.play-btn');

    if (thumbnail) thumbnail.classList.add('hidden');

    if (playBtn) playBtn.style.display = 'none';

    if (!wrapper.querySelector('iframe')) {
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container';
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.title = videoId;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.border = 'none';
        
        iframeContainer.appendChild(iframe);
        wrapper.appendChild(iframeContainer);
    }
}

function initCarousel() {
    const container = document.getElementById('tiktok-carousel');
    if (!container) return;

    const slidesContainer = container.querySelector('.slides');
    const indicatorsContainer = container.querySelector('.indicators');

    videoData.forEach((video, index) => {
        const slide = createVideoSlide(video, index);
        slidesContainer.appendChild(slide);

        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const slides = slidesContainer.querySelectorAll('.slide');
    const indicators = indicatorsContainer.querySelectorAll('.indicator');

    slidesContainer.addEventListener('scroll', () => {
        const scrollLeft = slidesContainer.scrollLeft;
        const slideWidth = slides[0]?.clientWidth || 0;
        const currentIndex = Math.round(scrollLeft / slideWidth);

        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });

        preloadAdjacentVideos(currentIndex);
    });

    function goToSlide(index) {
        const targetSlide = slides[index];
        if (targetSlide) {
            targetSlide.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
    }

    function preloadAdjacentVideos(currentIndex) {
        const nextIndex = currentIndex + 1;
        const prevIndex = currentIndex - 1;

        if (nextIndex < videoData.length) {
            const nextVideo = videoData[nextIndex];
            preloadImage(getYouTubeThumbnail(nextVideo.id));
        }

        if (prevIndex >= 0) {
            const prevVideo = videoData[prevIndex];
            preloadImage(getYouTubeThumbnail(prevVideo.id));
        }
    }

    function preloadImage(url) {
        const img = new Image();
        img.src = url;
    }

    const prevBtn = container.querySelector('.nav-arrow.prev');
    const nextBtn = container.querySelector('.nav-arrow.next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentIndex = getCurrentIndex();
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentIndex = getCurrentIndex();
            if (currentIndex < videoData.length - 1) goToSlide(currentIndex + 1);
        });
    }

    function getCurrentIndex() {
        const scrollLeft = slidesContainer.scrollLeft;
        const slideWidth = slides[0]?.clientWidth || 1;
        return Math.round(scrollLeft / slideWidth);
    }
}

document.addEventListener('DOMContentLoaded', initCarousel);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    window.addEventListener('load', function() {
        setTimeout(initCarousel, 100);
    });
}

window.addEventListener('load', function() {
    setTimeout(function() {
        const container = document.getElementById('tiktok-carousel');
        if (container && !container.querySelector('.slide')) {
            initCarousel();
        }
    }, 500);
});