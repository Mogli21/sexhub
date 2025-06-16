document.addEventListener('DOMContentLoaded', function() {
    // Read product data from HTML
    const products = {};
    ['pacoteC1', 'pacoteC2', 'pacoteC3', 'pacoteC4', 'pacoteC5',
     'pacoteMomAndSon', 'pacoteHighSchool', 'pacoteDarkzadie', 'pacoteAnxiousPanda', 'pacoteNewStuffPyt',
     'pacoteSnapgod', 'pacoteBlackmail', 'pacoteBrazzers', 'pacoteSnapchat', 'pacoteOmegle'
    ].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            products[id] = {
                name: element.getAttribute('data-nome'),
                description: element.getAttribute('data-descricao').split(','),
                price: element.getAttribute('data-preco')
            };
        }
    });

    // Fix buy button functionality
    function initializeBuyButtons() {
        const buyButtons = document.querySelectorAll('.price-button, .buy-now-button');
        const telegramUsername = 'kaylaz69';
        buyButtons.forEach((button) => {
            button.addEventListener('click', () => {
                try {
                    // Find the closest product container
                    const section = button.closest('.content-section');
                    if (!section) return;

                    // Try different product ID patterns
                    const productElement = section.querySelector('[id^="pacote"]') || 
                                        section.querySelector('[data-nome]') ||
                                        section.querySelector('[data-product-id]');

                    if (!productElement) {
                        console.warn('Product element not found, trying alternative method');
                        // Fallback to button's own attributes
                        const name = button.getAttribute('data-nome') || button.getAttribute('data-product-name') || 'Unknown Product';
                        const price = button.getAttribute('data-preco') || button.getAttribute('data-price') || 'Price not specified';
                        const description = (button.getAttribute('data-descricao') || button.getAttribute('data-description') || '').split(',');

                        const message = encodeURIComponent(
                            `Hello! I would like to buy\n\n` +
                            `Content: ${name}\n` +
                            `Description:\n${description.join('\n')}\n` +
                            `Price: $${price}`
                        );

                        window.open(`https://t.me/${telegramUsername}?text=${message}`, '_blank');
                        return;
                    }

                    // Get product data
                    const name = productElement.getAttribute('data-nome') || productElement.getAttribute('data-name');
                    const price = productElement.getAttribute('data-preco') || productElement.getAttribute('data-price');
                    const description = (productElement.getAttribute('data-descricao') || productElement.getAttribute('data-description') || '').split(',');

                    const message = encodeURIComponent(
                        `Hello! I would like to buy\n\n` +
                        `Content: ${name}\n` +
                        `Description:\n${description.join('\n')}\n` +
                        `Price: $${price}`
                    );

                    window.open(`https://t.me/${telegramUsername}?text=${message}`, '_blank');
                } catch (error) {
                    console.error('Error processing buy button click:', error);
                    // Fallback to direct Telegram link if there's an error
                    window.open(`https://t.me/${telegramUsername}`, '_blank');
                }
            });
        });
    }

    // Initialize buy buttons
    initializeBuyButtons();

    // Section navigation system
    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            selectedSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Initialize showing first section
    const firstSection = document.querySelector('.content-section');
    if (firstSection) {
        firstSection.style.display = 'block';
    }

    // Add navigation event listeners
    const allSections = ['cp1', 'cp2', 'cp3', 'cp4', 'cp5', 
                        'momandson', 'highschoolthots', 'darkzadie', 'anxiouspanda', 'newstuffpyt',
                        'snapgod', 'blackmail', 'brazzers', 'snapchat', 'omegle'];
    
    allSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.addEventListener('click', () => {
                showSection(sectionId);
            });
        }
    });

    // Check URL hash and show corresponding section
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        showSection(sectionId);
    }

    // Add listener for URL hash changes
    window.addEventListener('hashchange', function() {
        const sectionId = window.location.hash.substring(1);
        showSection(sectionId);
    });

    // Portrait gallery code
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

    // Video audio controls
    const videos = document.querySelectorAll('video');
    let currentUnmutedVideo = null;

    videos.forEach((video, index) => {
        const playPauseBtn = document.querySelector(`#playPauseBtn${index + 1}`);
        const muteBtn = document.querySelector(`#muteBtn${index + 1}`);

        // Play/Pause control
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = '⏸️';
                } else {
                    video.pause();
                    playPauseBtn.innerHTML = '▶️';
                }
            });
        }

        // Mute control with exclusivity
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                if (video.muted) {
                    // If this video is muted, unmute it
                    // First, mute all other videos
                    videos.forEach((otherVideo, otherIndex) => {
                        if (otherIndex !== index) {
                            otherVideo.muted = true;
                            const otherMuteBtn = document.querySelector(`#muteBtn${otherIndex + 1}`);
                            if (otherMuteBtn) {
                                otherMuteBtn.innerHTML = '🔇';
                            }
                        }
                    });
                    
                    // Now unmute this video
                    video.muted = false;
                    muteBtn.innerHTML = '🔊';
                    currentUnmutedVideo = video;
                } else {
                    // If this video is not muted, mute it
                    video.muted = true;
                    muteBtn.innerHTML = '🔇';
                    currentUnmutedVideo = null;
                }
            });
        }

        // Initialize all videos muted
        video.muted = true;
        if (muteBtn) {
            muteBtn.innerHTML = '🔇';
        }
    });
});
