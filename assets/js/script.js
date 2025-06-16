// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.video-carousel');
    const videos = document.querySelectorAll('.video-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // Função para mostrar o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % videos.length;
        carousel.scrollTo({
            left: videos[currentSlide].offsetLeft,
            behavior: 'smooth'
        });
    }

    // Função para mostrar o slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + videos.length) % videos.length;
        carousel.scrollTo({
            left: videos[currentSlide].offsetLeft,
            behavior: 'smooth'
        });
    }

    // Event listeners para os botões de navegação
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Função para mutar todos os vídeos exceto o atual
    function muteAllExcept(currentVideo) {
        const allVideos = document.querySelectorAll('video');
        const allMuteButtons = document.querySelectorAll('[id^="muteBtn"]');
        
        allVideos.forEach((video, index) => {
            if (video !== currentVideo) {
                video.muted = true;
                // Atualiza o ícone do botão mute correspondente
                if (allMuteButtons[index]) {
                    allMuteButtons[index].innerHTML = '🔇';
                }
            }
        });
    }

    // Controles para cada vídeo do carrossel principal
    videos.forEach((videoContainer, index) => {
        const video = videoContainer.querySelector('video');
        const playPauseBtn = videoContainer.querySelector(`#playPauseBtn${index + 1}`);
        const muteBtn = videoContainer.querySelector(`#muteBtn${index + 1}`);

        // Controle de Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '⏸️';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '▶️';
            }
        });

        // Controle de Mute com nova funcionalidade
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
            
            // Se o vídeo foi desmutado, muta todos os outros
            if (!video.muted) {
                muteAllExcept(video);
            }
        });
    });

    // Aqui você pode adicionar funcionalidades JavaScript futuras
    console.log('Site carregado com sucesso!');

    // Código atualizado para múltiplas galerias
    const photoGalleries = document.querySelectorAll('.photo-gallery-container');
    
    photoGalleries.forEach((galleryContainer) => {
        const photoGallery = galleryContainer.querySelector('.photo-gallery');
        const photos = galleryContainer.querySelectorAll('.photo-item');
        const prevGalleryBtn = galleryContainer.querySelector('.gallery-prev-btn');
        const nextGalleryBtn = galleryContainer.querySelector('.gallery-next-btn');
        let currentPhoto = 0;

        function scrollToNextPhoto() {
            currentPhoto = (currentPhoto + 1) % photos.length;
            photos[currentPhoto].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }

        function scrollToPrevPhoto() {
            currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
            photos[currentPhoto].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }

        if (nextGalleryBtn) {
            nextGalleryBtn.addEventListener('click', scrollToNextPhoto);
        }
        if (prevGalleryBtn) {
            prevGalleryBtn.addEventListener('click', scrollToPrevPhoto);
        }
    });

    // Verificação para age verification (apenas para index.html)
    const overlay = document.querySelector('.age-verification-overlay');
    if (overlay) {
        const exitBtn = document.querySelector('.exit-btn');
        const confirmBtn = document.querySelector('.confirm-btn');

        exitBtn.addEventListener('click', function() {
            window.location.href = 'https://www.google.com';
        });

        confirmBtn.addEventListener('click', function() {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        });
    }

    // Verificação para loading screen (apenas para index.html)
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        // Função para verificar se todas as imagens e vídeos foram carregados
        function checkAllContentLoaded() {
            const images = document.getElementsByTagName('img');
            const videos = document.getElementsByTagName('video');
            let totalContent = images.length + videos.length;
            let loadedContent = 0;

            function incrementLoader() {
                loadedContent++;
                if (loadedContent >= totalContent) {
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 1000);
                }
            }

            Array.from(images).forEach(img => {
                if (img.complete) {
                    incrementLoader();
                } else {
                    img.addEventListener('load', incrementLoader);
                    img.addEventListener('error', incrementLoader);
                }
            });

            Array.from(videos).forEach(video => {
                if (video.readyState >= 3) {
                    incrementLoader();
                } else {
                    video.addEventListener('canplay', incrementLoader);
                    video.addEventListener('error', incrementLoader);
                }
            });
        }

        // Inicia a verificação de carregamento
        checkAllContentLoaded();

        // Timeout máximo
        setTimeout(() => {
            if (loadingScreen.style.display !== 'none') {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 10000);
    }

    // Controles para vídeos da galeria retrato
    const portraitVideos = document.querySelectorAll('.portrait-gallery video');
    portraitVideos.forEach((video, index) => {
        const playPauseBtn = video.parentElement.querySelector(`#playPauseBtn${index + 6}`);
        const muteBtn = video.parentElement.querySelector(`#muteBtn${index + 6}`);

        // Controle de Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '⏸️';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '▶️';
            }
        });

        // Controle de Mute com nova funcionalidade
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
            
            // Se o vídeo foi desmutado, muta todos os outros
            if (!video.muted) {
                muteAllExcept(video);
            }
        });
    });

    // Simplifica o código do carrossel para usar apenas navegação por toque/deslize
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselTrack = document.querySelector('.carousel-track');
    const newPrevBtn = document.querySelector('.carousel-prev-btn');
    const newNextBtn = document.querySelector('.carousel-next-btn');
    let currentIndex = 0;
    const cardWidth = 420; // largura do card + gap

    // Mantém apenas o suporte para touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        carouselTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            
            if (Math.abs(touchStartX - touchEndX) > 50) {
                carouselWrapper.scrollBy({
                    left: touchStartX > touchEndX ? cardWidth : -cardWidth,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navegação por botões
    if (newPrevBtn && newNextBtn && carouselTrack) {
        newPrevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                carouselTrack.scrollBy({
                    left: -cardWidth,
                    behavior: 'smooth'
                });
            }
        });
        
        newNextBtn.addEventListener('click', () => {
            const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
            if (carouselTrack.scrollLeft < maxScroll) {
                currentIndex++;
                carouselTrack.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                });
            }
        });
    }
});
