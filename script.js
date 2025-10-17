// Mobile Navigation Toggle (sub-navbar only)
const subNavbar = document.querySelector('.sub-navbar');
const hamburger = subNavbar ? subNavbar.querySelector('.hamburger') : null;
const navMenu = subNavbar ? subNavbar.querySelector('.nav-menu') : null;

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on any nav link in sub-navbar
    subNavbar.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
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

/* Sticky navbar behavior like heyyyitsniah: class-based toggle */
const heroSection = document.querySelector('.hero');
const subNavbarEl = document.querySelector('.sub-navbar');
let heroVisible = true;

if (heroSection && subNavbarEl) {
    const heroObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        heroVisible = entry.isIntersecting;
        if (heroVisible) {
            // Hero visible: disable sticky and remove scrolled styles
            subNavbarEl.classList.add('sticky-disabled');
            subNavbarEl.classList.remove('sticky');
            subNavbarEl.classList.remove('scrolled');
        } else {
            // Hero out of view: enable sticky and scrolled styles
            subNavbarEl.classList.remove('sticky-disabled');
            subNavbarEl.classList.add('sticky');
            subNavbarEl.classList.add('scrolled');
        }
        // Apply body offset based on current sticky state
        applySubNavbarOffset();
    }, { threshold: 0, rootMargin: '-12px 0px 0px 0px' });
    heroObserver.observe(heroSection);
} else if (subNavbarEl) {
    // No hero section present (standalone pages): keep navbar sticky
    subNavbarEl.classList.remove('sticky-disabled');
    subNavbarEl.classList.add('sticky');
    subNavbarEl.classList.add('scrolled');
    heroVisible = false;
    // Apply body offset since navbar is fixed on standalone pages
    applySubNavbarOffset();
}

// Sync classes on scroll/resize to guard against edge cases
function applySubNavbarOffset() {
    const el = document.querySelector('.sub-navbar');
    if (!el) return;
    const nextEl = el.nextElementSibling; // typically the portfolio section on index.html
    const isSticky = el.classList.contains('sticky') && !el.classList.contains('sticky-disabled');

    if (nextEl) {
        if (isSticky) {
            const h = el.offsetHeight;
            nextEl.style.marginTop = `${h}px`;
        } else {
            nextEl.style.marginTop = '';
        }
    }
}

function syncSubNavbarState() {
    const el = document.querySelector('.sub-navbar');
    if (!el) return;
    if (heroVisible) {
        el.classList.add('sticky-disabled');
        el.classList.remove('sticky');
        el.classList.remove('scrolled');
    } else {
        el.classList.remove('sticky-disabled');
        el.classList.add('sticky');
        el.classList.add('scrolled');
    }
    applySubNavbarOffset();
}

window.addEventListener('scroll', syncSubNavbarState);
window.addEventListener('resize', syncSubNavbarState);

// Enhanced Intersection Observer for scroll-triggered animations
class ScrollRevealManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.revealElement(entry.target);
                // Stop observing once revealed to improve performance
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    revealElement(element) {
        // Add revealed class for CSS transitions
        element.classList.add('revealed');
        
        // Handle staggered animations for grid items
        if (element.classList.contains('stagger-container')) {
            this.handleStaggeredReveal(element);
        }
    }
    
    handleStaggeredReveal(container) {
        const items = container.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 100); // 100ms delay between each item
        });
    }
    
    setupAnimations() {
        // Video Gallery Section
        this.setupVideoGalleryAnimations();
        
        // Services Section
        this.setupServicesAnimations();
        
        // Testimonials Section
        this.setupTestimonialsAnimations();
        
        // Brands Section
        this.setupBrandsAnimations();
        
        // Contact Section
        this.setupContactAnimations();
        
        // Legacy support for existing elements
        this.setupLegacyAnimations();
    }
    
    setupVideoGalleryAnimations() {
        const videoSection = document.querySelector('.video-portfolio-section');
        if (videoSection) {
            // Section title
            const title = videoSection.querySelector('.video-portfolio-title');
            if (title) {
                title.classList.add('title-animate');
                this.observer.observe(title);
            }
            
            // Section subtitle
            const subtitle = videoSection.querySelector('.video-portfolio-subtitle');
            if (subtitle) {
                subtitle.classList.add('fade-in-up');
                this.observer.observe(subtitle);
            }
            
            // Video grid container
            const videoGrid = videoSection.querySelector('.video-grid');
            if (videoGrid) {
                videoGrid.classList.add('stagger-container');
                
                // Individual video items
                const videoItems = videoGrid.querySelectorAll('.video-item');
                videoItems.forEach((item, index) => {
                    item.classList.add('stagger-item');
                    if (index < 10) {
                        item.classList.add(`delay-${index + 1}`);
                    }
                });
                
                this.observer.observe(videoGrid);
            }
            
            // Video buttons
            const videoButtons = videoSection.querySelector('.video-buttons');
            if (videoButtons) {
                videoButtons.classList.add('fade-in-up');
                this.observer.observe(videoButtons);
            }
        }
    }
    
    setupServicesAnimations() {
        const servicesSection = document.querySelector('.services');
        if (servicesSection) {
            // Section title
            const title = servicesSection.querySelector('.section-title');
            if (title) {
                title.classList.add('title-animate');
                this.observer.observe(title);
            }
            
            // Services grid
            const servicesGrid = servicesSection.querySelector('.services-grid');
            if (servicesGrid) {
                servicesGrid.classList.add('stagger-container');
                
                // Individual service items
                const serviceItems = servicesGrid.querySelectorAll('.service-item');
                serviceItems.forEach((item, index) => {
                    item.classList.add('stagger-item');
                    if (index < 6) {
                        item.classList.add(`delay-${index + 1}`);
                    }
                });
                
                this.observer.observe(servicesGrid);
            }
        }
    }
    
    setupTestimonialsAnimations() {
        const testimonialsSection = document.querySelector('.testimonials');
        if (testimonialsSection) {
            // Section title
            const title = testimonialsSection.querySelector('.testimonials-title');
            if (title) {
                title.classList.add('title-animate');
                this.observer.observe(title);
            }
            
            // Testimonials grid
            const testimonialsGrid = testimonialsSection.querySelector('.testimonials-grid');
            if (testimonialsGrid) {
                testimonialsGrid.classList.add('stagger-container');
                
                // Individual testimonial items
                const testimonialItems = testimonialsGrid.querySelectorAll('.testimonial');
                testimonialItems.forEach((item, index) => {
                    item.classList.add('stagger-item');
                    if (index < 8) {
                        item.classList.add(`delay-${index + 1}`);
                    }
                });
                
                this.observer.observe(testimonialsGrid);
            }
            
            // See more buttons
            const seeMoreContainer = testimonialsSection.querySelector('.testimonials-see-more-container');
            if (seeMoreContainer) {
                seeMoreContainer.classList.add('fade-in-up');
                this.observer.observe(seeMoreContainer);
            }
        }
    }
    
    setupBrandsAnimations() {
        const brandsSection = document.querySelector('.brands');
        if (brandsSection) {
            // Section title
            const title = brandsSection.querySelector('.section-title');
            if (title) {
                title.classList.add('title-animate');
                this.observer.observe(title);
            }
            
            // Brands subtitle
            const subtitle = brandsSection.querySelector('.brands-subtitle');
            if (subtitle) {
                subtitle.classList.add('fade-in-up');
                this.observer.observe(subtitle);
            }
            
            // Brands grid
            const brandsGrid = brandsSection.querySelector('.brands-grid');
            if (brandsGrid) {
                brandsGrid.classList.add('stagger-container');
                
                // Individual brand logos
                const brandLogos = brandsGrid.querySelectorAll('.brand-logo');
                brandLogos.forEach((logo, index) => {
                    logo.classList.add('stagger-item');
                    if (index < 10) {
                        logo.classList.add(`delay-${(index % 10) + 1}`);
                    }
                });
                
                this.observer.observe(brandsGrid);
            }
        }
    }
    
    setupContactAnimations() {
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            // Section title
            const title = contactSection.querySelector('.section-title');
            if (title) {
                title.classList.add('title-animate');
                this.observer.observe(title);
            }
            
            // Contact content
            const contactContent = contactSection.querySelector('.contact-content');
            if (contactContent) {
                // Contact info (left side)
                const contactInfo = contactContent.querySelector('.contact-info');
                if (contactInfo) {
                    contactInfo.classList.add('fade-in-left');
                    this.observer.observe(contactInfo);
                }
                
                // Contact form (right side)
                const contactForm = contactContent.querySelector('.contact-form');
                if (contactForm) {
                    contactForm.classList.add('fade-in-right');
                    this.observer.observe(contactForm);
                }
            }
        }
    }
    
    setupLegacyAnimations() {
        // Support for existing portfolio items, service items, and testimonials
        document.querySelectorAll('.portfolio-item').forEach(el => {
            if (!el.classList.contains('stagger-item')) {
                el.classList.add('scroll-reveal');
                this.observer.observe(el);
            }
        });
    }
}

// Initialize the scroll reveal manager
const scrollRevealManager = new ScrollRevealManager();

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
        // Check for hero video elements - these may not exist in current HTML structure
        this.heroVideo = document.getElementById('hero-video');
        this.heroVideoTitle = document.getElementById('hero-video-title');
        this.heroVideoDesc = document.getElementById('hero-video-desc');
        this.audioControl = document.getElementById('audio-control');
        this.fullscreenControl = document.getElementById('fullscreen-control');
        this.playlistItems = document.querySelectorAll('.playlist-item');
        this.currentVideoIndex = 0;
        
        // Only initialize if hero video elements exist
        if (this.heroVideo && this.playlistItems.length > 0) {
            this.init();
        } else {
            console.log('Hero video elements not found - skipping HeroVideoManager initialization');
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
        
        // Audio control - only if element exists
        if (this.audioControl) {
            this.audioControl.addEventListener('click', () => {
                this.toggleAudio();
            });
        }

        // Fullscreen control - only if element exists
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
        
        // Update hero video - only if element exists
        if (!this.heroVideo) {
            console.warn('Hero video element not found - cannot switch video');
            return;
        }
        
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

// Video Grid Gallery with Modal Functionality
class VideoGridGallery {
    constructor() {
        // Look for both mobile-specific and general video items, plus videography thumbnail containers
        this.videoItems = document.querySelectorAll('.video-item-mobile, .video-item, .video-thumb');
        this.modal = null;
        this.currentVideoIndex = 0;
        
        if (this.videoItems.length > 0) {
            this.init();
        } else {
            console.log('No video items found for VideoGridGallery');
        }
    }
    
    init() {
        this.createModal();
        this.setupEventListeners();
        this.setupVideoHoverEffects();
    }
    
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'video-modal-mobile';
        this.modal.innerHTML = `
            <div class="video-modal-content-mobile">
                <button class="video-modal-close-mobile">&times;</button>
                <video class="video-modal-player-mobile" controls>
                    <source src="" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        document.body.appendChild(this.modal);
    }
    
    setupEventListeners() {
        // Video item clicks
        this.videoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
            });
        });
        
        // Modal close button
        const closeBtn = this.modal.querySelector('.video-modal-close-mobile');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal();
            });
        }
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Keyboard navigation (Escape key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    setupVideoHoverEffects() {
        this.videoItems.forEach(item => {
            // Do not auto-play hover previews for videography thumbnails
            if (item.classList.contains('video-thumb')) return;
            const video = item.querySelector('video');
            if (video) {
                item.addEventListener('mouseenter', () => {
                    video.play().catch(() => {});
                });
                
                item.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });
    }
    
    openModal(index) {
        this.currentVideoIndex = index;
        this.updateModalContent();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Pause video when closing
        const video = this.modal.querySelector('.video-modal-player-mobile');
        video.pause();
    }
    
    updateModalContent() {
        const currentItem = this.videoItems[this.currentVideoIndex];
        const sourceEl = this.modal.querySelector('.video-modal-player-mobile source');
    
        // Derive video source from data-video or from child <video>
        const childVideo = currentItem.querySelector('video');
        const childSource = childVideo ? (childVideo.currentSrc || childVideo.getAttribute('src') || (childVideo.querySelector('source') ? childVideo.querySelector('source').src : '')) : '';
        const src = currentItem.dataset.video || currentItem.getAttribute('data-video') || childSource || '';
        sourceEl.src = src;
    
        // Reload video with new source and enable audio
        const videoElement = this.modal.querySelector('.video-modal-player-mobile');
        videoElement.muted = false; // Enable audio for modal playback
        videoElement.load();
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
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const serviceSelect = document.getElementById('service');
        const messageInput = document.getElementById('message');

        const name = (nameInput?.value || '').trim();
        const serviceValue = serviceSelect?.value || '';
        const serviceText = serviceSelect && serviceSelect.selectedIndex >= 0 
            ? serviceSelect.options[serviceSelect.selectedIndex].text 
            : '';
        const message = (messageInput?.value || '').trim();

        if (!name || !serviceValue || !message) {
            if (typeof showNotification === 'function') {
                showNotification('Please fill in all required fields.', 'error');
            }
            return;
        }

        const subject = encodeURIComponent(`${name} - ${serviceText}`);
        const body = encodeURIComponent(message);
        const toEmail = 'hello@sriola.com';
        const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;

        // Open default email client with prefilled subject/body
        window.location.href = mailtoLink;
    });
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const bgColor = type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 
                   type === 'success' ? 'rgba(40, 167, 69, 0.9)' : 'rgba(0, 0, 0, 0.9)';
    
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

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
        // Close video modal if it exists
        const videoModal = document.querySelector('.video-modal-mobile.active');
        if (videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Pause video when closing
            const video = videoModal.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    }
    
    if (imageModal && imageModal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') navigateModal('prev');
        if (e.key === 'ArrowRight') navigateModal('next');
    }
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    
    // Initialize classes
    new PortfolioFilter();
    new ModernVideoGallery();
    new VideoGridGallery();
    initContactForm();
    initSeeMoreButtons();
    
    // Create image modal
    imageModal = createImageModal();
    
    // Collect all portfolio images
    collectPortfolioImages();
    
    // Setup navigation event listeners
    setupModalNavigation();
    
    console.log('Application initialized successfully');
});

// Global Error Handling
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    // Prevent error from breaking the application
    return true;
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Prevent unhandled rejection from breaking the application
    e.preventDefault();
});

// Video Error Handling
function addVideoErrorHandling() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('error', function(e) {
            console.warn('Video loading failed:', this.src);
            // Hide video element or show placeholder
            const parent = this.closest('.video-item, .phone-frame');
            if (parent) {
                parent.style.opacity = '0.5';
                const overlay = parent.querySelector('.video-play-overlay');
                if (overlay) {
                    overlay.innerHTML = '<div class="error-message">Video unavailable</div>';
                }
            }
        });
        
        video.addEventListener('loadstart', function() {
            console.log('Video loading started:', this.src);
        });
    });
}

// Initialize error handling after DOM is loaded
addVideoErrorHandling();

// VideoGallery class removed - using VideoGridGallery instead

// See More buttons initialization moved to main DOMContentLoaded event listener

// Add at the end of the file

// Portfolio and Testimonials See More functionality
function initSeeMoreButtons() {
    // Remove existing event listeners to prevent duplicates
    const portfolioBtn = document.getElementById('portfolio-see-more');
    const portfolioMinBtn = document.getElementById('portfolio-minimize');
    const testimonialsBtn = document.getElementById('seeAllReviews');
    const testimonialsMinBtn = document.getElementById('testimonials-minimize');
    
    // Log missing elements for debugging
    if (!portfolioBtn) console.log('Portfolio see-more button not found');
    if (!portfolioMinBtn) console.log('Portfolio minimize button not found');
    const videoBtn = document.getElementById('videoPortfolioSeeMoreBtn');
    const videoMinBtn = document.getElementById('videoPortfolioMinimizeBtn');
    const heroVideoBtn = document.getElementById('videoSeeMoreBtn');
    const heroVideoMinBtn = document.getElementById('videoMinimizeBtn');
    
    // Clear any existing event listeners by cloning and replacing elements
    if (videoBtn) {
        const newVideoBtn = videoBtn.cloneNode(true);
        videoBtn.parentNode.replaceChild(newVideoBtn, videoBtn);
    }
    if (videoMinBtn) {
        const newVideoMinBtn = videoMinBtn.cloneNode(true);
        videoMinBtn.parentNode.replaceChild(newVideoMinBtn, videoMinBtn);
    }
    // Hero video buttons no longer exist in DOM
    
    // Get the fresh references
    const freshVideoBtn = document.getElementById('videoPortfolioSeeMoreBtn');
    const freshVideoMinBtn = document.getElementById('videoPortfolioMinimizeBtn');
    // Hero video buttons removed from DOM
    
    if (window.innerWidth > 600) {
        // Desktop behavior
        if (portfolioBtn && portfolioMinBtn) {
            portfolioBtn.addEventListener('click', function() {
                const hiddenItems = document.querySelectorAll('.hidden-portfolio');
                hiddenItems.forEach(item => {
                    item.style.display = 'block';
                    item.classList.remove('hidden-portfolio');
                    item.classList.add('expanded-portfolio');
                });
                this.style.display = 'none';
                portfolioMinBtn.style.display = 'block';
            });
            
            portfolioMinBtn.addEventListener('click', function() {
                const expandedItems = document.querySelectorAll('.expanded-portfolio');
                expandedItems.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('hidden-portfolio');
                    item.classList.remove('expanded-portfolio');
                });
                this.style.display = 'none';
                portfolioBtn.style.display = 'block';
            });
        }
        
        if (testimonialsBtn && testimonialsMinBtn) {
            testimonialsBtn.addEventListener('click', function() {
                const hiddenItems = document.querySelectorAll('.hidden-testimonial');
                hiddenItems.forEach(item => {
                    item.style.display = 'block';
                    item.classList.remove('hidden-testimonial');
                    item.classList.add('expanded-testimonial');
                });
                this.style.display = 'none';
                testimonialsMinBtn.style.display = 'block';
            });
            
            testimonialsMinBtn.addEventListener('click', function() {
                const expandedItems = document.querySelectorAll('.expanded-testimonial');
                expandedItems.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('hidden-testimonial');
                    item.classList.remove('expanded-testimonial');
                });
                this.style.display = 'none';
                testimonialsBtn.style.display = 'block';
            });
        }
        
        if (freshVideoBtn && freshVideoMinBtn) {
            freshVideoBtn.addEventListener('click', function() {
                const hiddenItems = document.querySelectorAll('.video-item:nth-child(n+7)');
                hiddenItems.forEach(item => {
                    item.classList.add('show-more');
                });
                this.style.display = 'none';
                freshVideoMinBtn.style.display = 'inline-block';
            });
            
            freshVideoMinBtn.addEventListener('click', function() {
                const expandedItems = document.querySelectorAll('.video-item.show-more');
                expandedItems.forEach(item => {
                    item.classList.remove('show-more');
                });
                this.style.display = 'none';
                freshVideoBtn.style.display = 'inline-block';
            });
        }
    }
    
    // Hero section video button removed - no longer needed
    
    // Mobile behavior (separate from hero button logic)
    if (window.innerWidth <= 600) {
        if (portfolioBtn && portfolioMinBtn) {
            portfolioBtn.addEventListener('click', function() {
                const hiddenItems = document.querySelectorAll('.portfolio-item:nth-child(n+7)');
                hiddenItems.forEach(item => {
                    item.style.display = 'block';
                    item.classList.add('show-more');
                    item.classList.add('expanded-portfolio-mobile');
                });
                this.style.display = 'none';
                portfolioMinBtn.style.display = 'block';
            });
            
            portfolioMinBtn.addEventListener('click', function() {
                const expandedItems = document.querySelectorAll('.expanded-portfolio-mobile');
                expandedItems.forEach(item => {
                    item.style.display = 'none';
                    item.classList.remove('show-more');
                    item.classList.remove('expanded-portfolio-mobile');
                });
                this.style.display = 'none';
                portfolioBtn.style.display = 'block';
            });
        }
        
        if (freshVideoBtn && freshVideoMinBtn) {
            freshVideoBtn.addEventListener('click', function() {
                const hiddenItems = document.querySelectorAll('.video-item:nth-child(n+7)');
                hiddenItems.forEach(item => {
                    item.classList.add('show-more');
                });
                this.style.display = 'none';
                freshVideoMinBtn.style.display = 'inline-block';
            });
            
            freshVideoMinBtn.addEventListener('click', function() {
                const expandedItems = document.querySelectorAll('.video-item.show-more');
                expandedItems.forEach(item => {
                    item.classList.remove('show-more');
                });
                this.style.display = 'none';
                freshVideoBtn.style.display = 'inline-block';
            });
        }
        
        if (testimonialsBtn && testimonialsMinBtn) {
            testimonialsBtn.addEventListener('click', function() {
                const hiddenItems = document.querySelectorAll('.testimonial:nth-child(n+4)');
                hiddenItems.forEach(item => {
                    item.style.display = 'block';
                    item.classList.add('show-more');
                    item.classList.add('expanded-testimonial-mobile');
                });
                this.style.display = 'none';
                testimonialsMinBtn.style.display = 'block';
            });
            
            testimonialsMinBtn.addEventListener('click', function() {
                const expandedItems = document.querySelectorAll('.expanded-testimonial-mobile');
                expandedItems.forEach(item => {
                    item.style.display = 'none';
                    item.classList.remove('show-more');
                    item.classList.remove('expanded-testimonial-mobile');
                });
                this.style.display = 'none';
                testimonialsBtn.style.display = 'block';
            });
        }
    }
}

// Re-initialize on window resize
window.addEventListener('resize', function() {
    initSeeMoreButtons();
});

// Marquee Photo Modal Functionality
class MarqueePhotoModal {
    constructor() {
        this.modal = document.getElementById('photoModal');
        this.modalPhoto = document.getElementById('modalPhoto');
        this.closeBtn = document.querySelector('.photo-modal-close');
        this.prevBtn = document.getElementById('photoPrevBtn');
        this.nextBtn = document.getElementById('photoNextBtn');
        this.counter = document.getElementById('photoCounter');
        this.currentIndex = 0;
        this.photos = [];
        this.isLoading = false;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        this.init();
    }

    init() {
        this.collectPhotos();
        this.setupEventListeners();
        this.setupPhotoClickHandlers();
        this.setupAccessibility();
        this.setupTouchGestures();
    }

    collectPhotos() {
        // Collect all marquee images and filter out duplicates
        const allImages = Array.from(document.querySelectorAll('.marquee-image'));
        const uniqueImages = new Map();
        
        allImages.forEach((img, index) => {
            const src = img.src;
            if (!uniqueImages.has(src)) {
                uniqueImages.set(src, {
                    src: src,
                    alt: img.alt || `Portfolio photo ${index + 1}`
                });
            }
        });
        
        this.photos = Array.from(uniqueImages.values());
    }

    setupEventListeners() {
        // Close modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Navigation events
        this.prevBtn.addEventListener('click', () => this.navigatePhoto(-1));
        this.nextBtn.addEventListener('click', () => this.navigatePhoto(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.navigatePhoto(-1);
                        break;
                    case 'ArrowRight':
                        this.navigatePhoto(1);
                        break;
                    case 'Home':
                        this.goToPhoto(0);
                        break;
                    case 'End':
                        this.goToPhoto(this.photos.length - 1);
                        break;
                }
            }
        });
    }

    setupAccessibility() {
        // Add ARIA attributes
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('aria-labelledby', 'modal-title');
        
        // Add focus management
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.trapFocus(e);
            }
        });
    }

    setupTouchGestures() {
        this.modal.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        this.modal.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                this.navigatePhoto(-1); // Swipe right - previous image
            } else {
                this.navigatePhoto(1);  // Swipe left - next image
            }
        }
    }

    trapFocus(e) {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    setupPhotoClickHandlers() {
        document.querySelectorAll('.marquee-image').forEach((img) => {
            img.addEventListener('click', () => {
                // Find the correct index in the unique photos array
                const clickedSrc = img.src;
                const photoIndex = this.photos.findIndex(photo => photo.src === clickedSrc);
                if (photoIndex !== -1) {
                    this.openModal(photoIndex);
                }
            });
        });
    }

    openModal(index) {
        this.currentIndex = index;
        this.updateModalContent();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        this.modal.style.opacity = '0';
        setTimeout(() => {
            this.modal.style.opacity = '1';
        }, 10);
        
        // Focus management for accessibility
        this.closeBtn.focus();
    }

    closeModal() {
        this.modal.style.opacity = '0';
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    navigatePhoto(direction) {
        if (this.isLoading) return;
        
        this.currentIndex += direction;
        
        // Loop around
        if (this.currentIndex >= this.photos.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.photos.length - 1;
        }
        
        this.updateModalContent();
    }

    goToPhoto(index) {
        if (this.isLoading || index < 0 || index >= this.photos.length) return;
        
        this.currentIndex = index;
        this.updateModalContent();
    }

    updateModalContent() {
        const photo = this.photos[this.currentIndex];
        this.isLoading = true;
        
        // Show loading state
        this.modalPhoto.style.opacity = '0.5';
        this.modalPhoto.style.filter = 'blur(2px)';
        
        // Preload image for better performance
        const img = new Image();
        img.onload = () => {
            this.modalPhoto.src = photo.src;
            this.modalPhoto.alt = photo.alt;
            this.modalPhoto.style.opacity = '1';
            this.modalPhoto.style.filter = 'none';
            this.isLoading = false;
        };
        
        img.onerror = () => {
            console.error('Failed to load image:', photo.src);
            this.modalPhoto.alt = 'Failed to load image';
            this.modalPhoto.style.opacity = '1';
            this.modalPhoto.style.filter = 'none';
            this.isLoading = false;
        };
        
        img.src = photo.src;
        
        // Update counter and navigation button states
        this.counter.textContent = `${this.currentIndex + 1} / ${this.photos.length}`;
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        // Update button accessibility
        this.prevBtn.setAttribute('aria-label', `Previous image (${this.currentIndex} of ${this.photos.length})`);
        this.nextBtn.setAttribute('aria-label', `Next image (${this.currentIndex + 2} of ${this.photos.length})`);
        
        // Visual feedback for single image
        if (this.photos.length === 1) {
            this.prevBtn.style.opacity = '0.3';
            this.nextBtn.style.opacity = '0.3';
        } else {
            this.prevBtn.style.opacity = '1';
            this.nextBtn.style.opacity = '1';
        }
    }
}

// Initialize marquee photo modal and parallax CTA (mobile fallback)
document.addEventListener('DOMContentLoaded', () => {
    // Parallax CTA JS fallback for devices where background-attachment: fixed is disabled
    function initParallaxCTA() {
        const sections = document.querySelectorAll('.cta-parallax');
        if (!sections.length) return;

        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const needsJS = isCoarsePointer || isiOS || Array.from(sections).some(s => getComputedStyle(s).backgroundAttachment !== 'fixed');

        if (!needsJS) return;

        // Build transform-based background layer for mobile/touch
        const layers = [];
        sections.forEach(section => {
            section.style.backgroundAttachment = 'scroll';
            // create bg layer if missing
            let bg = section.querySelector('.cta-bg');
            if (!bg) {
                bg = document.createElement('div');
                bg.className = 'cta-bg';
                const computed = getComputedStyle(section);
                if (computed.backgroundImage && computed.backgroundImage !== 'none') {
                    bg.style.backgroundImage = computed.backgroundImage;
                }
                section.classList.add('has-js-parallax');
                section.appendChild(bg);
            }
            layers.push({ section, bg });
        });

        let ticking = false;
        const update = () => {
            layers.forEach(({ section, bg }) => {
                const rect = section.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) return;
                const y = Math.round(-rect.top);
                // Shift background-position to simulate parallax without exposing edges
                bg.style.backgroundPosition = `center ${Math.round(y * 0.35)}px`;
            });
            ticking = false;
        };

        const requestUpdate = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
        requestUpdate();
    }

    initParallaxCTA();

    // Index hero animations: staggered quote reveal and CTA entry
    (function initIndexHeroAnimations() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const quoteEl = document.querySelector('#home .hero-quote blockquote');
        if (quoteEl) {
            const fullText = (quoteEl.textContent || '').trim().replace(/\s+/g, ' ');
            if (!prefersReduced) {
                const words = fullText.split(' ');
                quoteEl.textContent = '';
                words.forEach((word, i) => {
                    const span = document.createElement('span');
                    span.className = 'reveal-word';
                    span.style.setProperty('--delay', `${Math.min(i * 60, 2400)}ms`);
                    span.textContent = word;
                    quoteEl.appendChild(span);
                    if (i < words.length - 1) {
                        // Add a normal space text node after each word to preserve spacing
                        quoteEl.appendChild(document.createTextNode(' '));
                    }
                });
            } else {
                quoteEl.textContent = fullText;
            }
        }
        const instaText = document.querySelector('.cta-section .instagram-text');
        const instaLink = document.querySelector('.cta-section .instagram-link');
        if (instaText) instaText.classList.add('cta-text-enter');
        if (instaLink) instaLink.classList.add('cta-enter');
    })();

    // Typewriter animation for hero page titles across dedicated pages
    (function initHeroTypewriter() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const titleEl = document.querySelector('.page-hero.video .page-title');
        if (!titleEl) return;
        const fullText = (titleEl.textContent || '').trim();
        titleEl.classList.add('typewriter-active');

        if (prefersReduced) {
            // Show full text without animation
            titleEl.textContent = fullText;
            return;
        }

        // Create inner span for typed text so caret can sit after it
        const typedSpan = document.createElement('span');
        typedSpan.className = 'typewriter-text';
        titleEl.textContent = '';
        titleEl.appendChild(typedSpan);

        let i = 0;
        const delayBefore = 200; // small pause before typing
        const perChar = 90; // ms per character for comfortable pace
        setTimeout(() => {
            const tick = () => {
                if (i < fullText.length) {
                    typedSpan.textContent += fullText.charAt(i);
                    i++;
                    setTimeout(tick, perChar);
                } else {
                    // typing complete: caret keeps blinking via CSS
                }
            };
            tick();
        }, delayBefore);
    })();

    const photoModalEl = document.getElementById('photoModal');
    const marqueeSection = document.querySelector('.marquee-gallery');
    if (photoModalEl || marqueeSection) {
        new MarqueePhotoModal();
    }
});