class BackgroundRemover {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.selectedFile = null;
        this.isProcessing = false;
        this.initTheme();
        this.initAnimations();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.formatSelect = document.getElementById('formatSelect');
        this.processBtn = document.getElementById('processBtn');
        this.resultSection = document.getElementById('resultSection');
        this.originalImage = document.getElementById('originalImage');
        this.resultImage = document.getElementById('resultImage');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.newImageBtn = document.getElementById('newImageBtn');
        this.loading = document.getElementById('loading');
        
        // New elements for enhanced functionality
        this.uploadContent = document.getElementById('uploadContent');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewImage = document.getElementById('previewImage');
        this.changeImageBtn = document.getElementById('changeImageBtn');
        this.themeToggle = document.getElementById('themeToggle');
        
        // Gauge elements
        this.progressGauge = document.getElementById('progressGauge');
        this.progressCircle = document.getElementById('progressCircle');
        this.progressText = document.getElementById('progressText');
        this.loadingTitle = document.getElementById('loadingTitle');
        this.loadingMessage = document.getElementById('loadingMessage');
    }

    setupEventListeners() {
        // File input events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop events
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

        // Process button
        this.processBtn.addEventListener('click', () => this.processImage());

        // Download and new image buttons
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.newImageBtn.addEventListener('click', () => this.resetApp());
        
        // Change image button
        this.changeImageBtn.addEventListener('click', () => this.fileInput.click());
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    handleFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select a valid image file.', 'error');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showNotification('File size must be less than 10MB.', 'error');
            return;
        }

        this.selectedFile = file;
        this.processBtn.disabled = false;
        
        // Show image preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
            // Update preview image
            this.previewImage.src = e.target.result;
            
            // Update original image for comparison
            this.originalImage.src = e.target.result;
            
            // Show preview and hide upload content
            this.uploadContent.style.display = 'none';
            this.imagePreview.style.display = 'block';
            
            // Add fade in animation
            this.imagePreview.style.opacity = '0';
            this.imagePreview.style.transform = 'scale(0.95)';
            this.imagePreview.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.imagePreview.style.opacity = '1';
                this.imagePreview.style.transform = 'scale(1)';
            }, 100);
        };
        reader.readAsDataURL(file);
        
        this.showNotification('Image loaded successfully!', 'success');
    }

    async processImage() {
        if (!this.selectedFile || this.isProcessing) return;

        this.isProcessing = true;
        this.showLoading(true);
        this.resultSection.style.display = 'none';

        try {
            // Convert file to base64
            const base64 = await this.fileToBase64(this.selectedFile);
            
            // Prepare request data
            const requestData = {
                image: base64,
                format: this.formatSelect.value
            };

            // Make API call
            const response = await fetch('/api/remove_background', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();

            if (result.success) {
                this.resultImage.src = result.image;
                this.resultImage.onload = () => {
                    this.resultSection.style.display = 'block';
                    this.showLoading(false);
                    this.isProcessing = false;
                    this.showNotification('Background removed successfully!', 'success');
                    
                    // Add celebration animation
                    this.celebrateSuccess();
                };
            } else {
                throw new Error(result.error || 'Failed to remove background');
            }

        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error processing image: ' + error.message, 'error');
            this.showLoading(false);
            this.isProcessing = false;
        }
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    downloadImage() {
        if (!this.resultImage.src) return;

        const link = document.createElement('a');
        link.href = this.resultImage.src;
        link.download = `background-removed.${this.formatSelect.value.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    resetApp() {
        this.selectedFile = null;
        this.fileInput.value = '';
        this.processBtn.disabled = true;
        this.resultSection.style.display = 'none';
        this.originalImage.src = '';
        this.resultImage.src = '';
        this.showLoading(false);
        this.isProcessing = false;
        
        // Reset upload area
        this.uploadContent.style.display = 'flex';
        this.imagePreview.style.display = 'none';
        this.previewImage.src = '';
        
        this.showNotification('Ready for a new image!', 'info');
    }

    showLoading(show) {
        this.loading.style.display = show ? 'block' : 'none';
        this.processBtn.disabled = show;
        
        if (show) {
            this.startProgressAnimation();
        } else {
            this.resetProgress();
        }
    }

    initAnimations() {
        // Add entrance animations to elements
        const elements = [this.uploadArea, this.formatSelect, this.processBtn];
        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            max-width: 400px;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        return icons[type] || icons.info;
    }

    getNotificationColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            error: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
            info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            warning: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)'
        };
        return colors[type] || colors.info;
    }

    celebrateSuccess() {
        // Create confetti effect
        const confettiCount = 50;
        const colors = ['#667eea', '#764ba2', '#4facfe', '#00f2fe'];
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                this.createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 10);
        }
    }

    createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${color};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 10000;
            border-radius: 50%;
            animation: confettiFall 3s linear forwards;
        `;

        // Add keyframes if not already added
        if (!document.querySelector('#confetti-styles')) {
            const style = document.createElement('style');
            style.id = 'confetti-styles';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }

    initTheme() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Show notification
        this.showNotification(`Switched to ${newTheme} mode`, 'info');
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle button state
        if (this.themeToggle) {
            const sunIcon = this.themeToggle.querySelector('.fa-sun');
            const moonIcon = this.themeToggle.querySelector('.fa-moon');
            
            if (theme === 'dark') {
                sunIcon.style.opacity = '0';
                moonIcon.style.opacity = '1';
            } else {
                sunIcon.style.opacity = '1';
                moonIcon.style.opacity = '0';
            }
        }
    }

    startProgressAnimation() {
        if (!this.progressCircle || !this.progressText) return;
        
        // Reset progress
        this.resetProgress();
        
        // Calculate circumference (2 * π * radius, radius = 40)
        const circumference = 2 * Math.PI * 40; // 251.2
        let progress = 0;
        
        // Simulate realistic progress with varying speeds
        const progressSteps = [
            { target: 15, duration: 800, title: "Uploading Image", message: "Sending your image to our AI..." },
            { target: 35, duration: 1200, title: "Analyzing Image", message: "Detecting objects and edges..." },
            { target: 65, duration: 1500, title: "AI Processing", message: "Removing background with precision..." },
            { target: 85, duration: 1000, title: "Finalizing", message: "Optimizing the result..." },
            { target: 100, duration: 800, title: "Complete!", message: "Your image is ready!" }
        ];
        
        let currentStep = 0;
        
        const animateStep = () => {
            if (currentStep >= progressSteps.length) return;
            
            const step = progressSteps[currentStep];
            const startProgress = progress;
            const progressDiff = step.target - startProgress;
            const startTime = Date.now();
            
            // Update loading messages
            if (this.loadingTitle && this.loadingMessage) {
                this.loadingTitle.textContent = step.title;
                this.loadingMessage.textContent = step.message;
            }
            
            const updateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progressRatio = Math.min(elapsed / step.duration, 1);
                
                // Use easing function for smooth animation
                const easedProgress = this.easeOutCubic(progressRatio);
                progress = startProgress + (progressDiff * easedProgress);
                
                // Update gauge
                const offset = circumference - (progress / 100) * circumference;
                this.progressCircle.style.strokeDashoffset = offset;
                this.progressText.textContent = Math.round(progress) + '%';
                
                if (progressRatio < 1) {
                    requestAnimationFrame(updateProgress);
                } else {
                    currentStep++;
                    setTimeout(animateStep, 300); // Small delay between steps
                }
            };
            
            updateProgress();
        };
        
        animateStep();
    }
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    resetProgress() {
        if (!this.progressCircle || !this.progressText) return;
        
        const circumference = 2 * Math.PI * 40;
        this.progressCircle.style.strokeDashoffset = circumference;
        this.progressText.textContent = '0%';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundRemover();
});

// Add some helpful console messages
console.log('🎨 AI Background Remover loaded successfully!');
console.log('💡 Tip: You can drag and drop images directly onto the upload area');

