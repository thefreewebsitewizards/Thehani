// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.portfolio-item, .service-item, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Portfolio Filter Functionality
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        if (this.filterButtons.length > 0) {
            this.init();
        }
    }

    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setActiveButton(e.target);
                this.filterItems(filter);
            });
        });

        // Initialize view buttons for modal
        this.initViewButtons();
    }

    setActiveButton(activeBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    filterItems(filter) {
        this.portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    initViewButtons() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const imageSrc = e.target.getAttribute('data-image');
                if (imageSrc) {
                    showImageModal(imageSrc, 'Portfolio Image');
                }
            });
        });
    }
}

// Modern Video Gallery with Playlist Functionality
class ModernVideoGallery {
    constructor() {
        this.heroVideo = document.getElementById('hero-video');
        this.heroVideoTitle = document.getElementById('hero-video-title');
        this.heroVideoDesc = document.getElementById('hero-video-desc');
        this.audioControl = document.getElementById('audio-control');
        this.fullscreenControl = document.getElementById('fullscreen-control');
        this.playlistItems = document.querySelectorAll('.playlist-item');
        this.currentVideoIndex = 0;
        
        if (this.heroVideo && this.playlistItems.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.setupEventListeners();
        this.setupVideoEvents();
        
        // Set first video as active
        if (this.playlistItems.length > 0) {
            this.playlistItems[0].classList.add('active');
        }
    }
    
    setupEventListeners() {
        // Playlist item clicks
        this.playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.switchVideo(index);
            });
            
            // Hover effects for playlist thumbnails
            const video = item.querySelector('video');
            if (video) {
                item.addEventListener('mouseenter', () => {
                    video.play().catch(e => console.log('Preview play prevented:', e));
                });
                
                item.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });
        
        // Audio control
        if (this.audioControl) {
            this.audioControl.addEventListener('click', () => {
                this.toggleAudio();
            });
        }
        
        // Fullscreen control
        if (this.fullscreenControl) {
            this.fullscreenControl.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
    }
    
    setupVideoEvents() {
        if (this.heroVideo) {
            this.heroVideo.addEventListener('loadedmetadata', () => {
                console.log('Video loaded successfully');
            });
            
            this.heroVideo.addEventListener('play', () => {
                console.log('Video started playing');
            });
            
            this.heroVideo.addEventListener('error', (e) => {
                console.error('Video error:', e);
                this.showNotification('Error loading video', 'error');
            });
        }
    }
    
    switchVideo(index) {
        const selectedItem = this.playlistItems[index];
        if (!selectedItem) return;
        
        const videoSrc = selectedItem.dataset.video;
        const title = selectedItem.dataset.title || 'Video';
        const description = selectedItem.dataset.desc || 'Description';
        const category = selectedItem.dataset.category || 'Video';
        const duration = selectedItem.dataset.duration || '0:00';
        
        if (!videoSrc) {
            console.error('No video source found for playlist item');
            return;
        }
        
        // Update hero video
        this.heroVideo.src = videoSrc;
        this.heroVideo.load();
        
        // Enable audio when switching videos
        this.heroVideo.muted = false;
        this.updateAudioButton(false);
        
        // Play the video
        this.heroVideo.play().catch(e => {
            console.log('Video play prevented:', e);
            this.showNotification('Click play to start video', 'info');
        });
        
        // Update video information
        if (this.heroVideoTitle) this.heroVideoTitle.textContent = title;
        if (this.heroVideoDesc) this.heroVideoDesc.textContent = description;
        
        // Update category and duration in the meta section
        const categoryElement = document.querySelector('.video-category');
        const durationElement = document.querySelector('.video-duration');
        if (categoryElement) categoryElement.textContent = category;
        if (durationElement) durationElement.textContent = duration;
        
        // Update active states
        this.playlistItems.forEach(item => item.classList.remove('active'));
        selectedItem.classList.add('active');
        
        this.currentVideoIndex = index;
        
        // Show notification
        this.showNotification(`Now playing: ${title}`);
    }
    
    toggleAudio() {
        if (!this.heroVideo) return;
        
        this.heroVideo.muted = !this.heroVideo.muted;
        this.updateAudioButton(this.heroVideo.muted);
        
        // Show audio status
        this.showNotification(this.heroVideo.muted ? 'Audio Muted' : 'Audio Enabled');
    }
    
    updateAudioButton(isMuted) {
        if (!this.audioControl) return;
        
        const icon = this.audioControl.querySelector('.audio-icon');
        const text = this.audioControl.querySelector('span');
        
        if (isMuted) {
            if (icon) icon.textContent = '🔇';
            if (text) text.textContent = 'Unmute';
            this.audioControl.style.opacity = '0.7';
        } else {
            if (icon) icon.textContent = '🔊';
            if (text) text.textContent = 'Mute';
            this.audioControl.style.opacity = '1';
        }
    }
    
    toggleFullscreen() {
        if (!this.heroVideo) return;
        
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            this.heroVideo.requestFullscreen().catch(e => {
                console.log('Fullscreen not supported:', e);
                this.showNotification('Fullscreen not supported', 'error');
            });
        }
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.video-notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'video-notification';
        notification.textContent = message;
        
        const bgColor = type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 'rgba(0, 0, 0, 0.9)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Image Modal Functions
function createImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-nav">
                <button class="modal-prev">❮</button>
                <button class="modal-next">❯</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

let imageModal = null;
let currentModalIndex = 0;
let modalImages = [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioFilter();
    new ModernVideoGallery();
    initContactForm();
    
    // Create image modal
    imageModal = createImageModal();
    
    // Collect all portfolio images
    collectPortfolioImages();
    
    // Setup navigation event listeners
    setupModalNavigation();
});

function collectPortfolioImages() {
    modalImages = [];
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        const img = item.querySelector('.portfolio-image');
        const title = item.querySelector('.portfolio-content h4');
        if (img && title) {
            modalImages.push({
                src: img.src,
                alt: img.alt,
                title: title.textContent,
                index: index
            });
        }
    });
}

function setupModalNavigation() {
    if (!imageModal) return;
    
    const prevBtn = imageModal.querySelector('.modal-prev');
    const nextBtn = imageModal.querySelector('.modal-next');
    
    prevBtn.addEventListener('click', () => navigateModal('prev'));
    nextBtn.addEventListener('click', () => navigateModal('next'));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (imageModal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateModal('prev');
            if (e.key === 'ArrowRight') navigateModal('next');
            if (e.key === 'Escape') closeImageModal();
        }
    });
}

function showImageModal(src, alt) {
    if (!imageModal) return;
    
    // Find current image index
    currentModalIndex = modalImages.findIndex(img => img.src === src);
    if (currentModalIndex === -1) currentModalIndex = 0;
    
    updateModalImage();
    
    imageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Setup modal event listeners
    const closeBtn = imageModal.querySelector('.modal-close');
    closeBtn.onclick = closeImageModal;
    
    imageModal.onclick = (e) => {
        if (e.target === imageModal) closeImageModal();
    };
}

function updateModalImage() {
    if (!imageModal || modalImages.length === 0) return;
    
    const modalImg = imageModal.querySelector('.modal-image');
    const currentImage = modalImages[currentModalIndex];
    
    modalImg.src = currentImage.src;
    modalImg.alt = currentImage.alt;
    
    // Update navigation button states
    const prevBtn = imageModal.querySelector('.modal-prev');
    const nextBtn = imageModal.querySelector('.modal-next');
    
    prevBtn.style.opacity = currentModalIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentModalIndex === modalImages.length - 1 ? '0.5' : '1';
    
    prevBtn.disabled = currentModalIndex === 0;
    nextBtn.disabled = currentModalIndex === modalImages.length - 1;
}

function closeImageModal() {
    if (imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function navigateModal(direction) {
    if (modalImages.length === 0) return;
    
    if (direction === 'next' && currentModalIndex < modalImages.length - 1) {
        currentModalIndex++;
    } else if (direction === 'prev' && currentModalIndex > 0) {
        currentModalIndex--;
    }
    
    updateModalImage();
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (name && email && message) {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
    
    if (imageModal && imageModal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            navigateModal(-1);
        } else if (e.key === 'ArrowRight') {
            navigateModal(1);
        }
    }
});

// Animation Styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Modern Video Gallery...');
    
    // Initialize the modern video gallery
    const videoGallery = new ModernVideoGallery();
    
    if (videoGallery.heroVideo && videoGallery.playlistItems.length > 0) {
        console.log('Video gallery initialized successfully');
    } else {
        console.log('Video gallery elements not found');
    }
});