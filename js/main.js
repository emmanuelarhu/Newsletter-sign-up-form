// Newsletter Form Main Application
class NewsletterForm {
  constructor() {
    this.form = document.getElementById('newsletterForm');
    this.emailInput = document.getElementById('email');
    this.submitBtn = document.getElementById('submitBtn');
    this.emailError = document.getElementById('emailError');
    this.signupForm = document.getElementById('signupForm');
    this.successMessage = document.getElementById('successMessage');
    this.userEmailSpan = document.getElementById('userEmail');
    this.dismissBtn = document.getElementById('dismissBtn');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.emailInput.focus();
  }

  bindEvents() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    this.emailInput.addEventListener('input', () => this.validateEmail());
    this.emailInput.addEventListener('blur', () => this.validateEmail());
    this.emailInput.addEventListener('focus', () => this.clearError());
    
    // Dismiss success message
    this.dismissBtn.addEventListener('click', () => this.dismissSuccess());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  validateEmail() {
    const email = this.emailInput.value;
    
    // Clear previous error state
    this.clearError();
    
    const validation = FormValidator.validateEmail(email);
    
    if (!validation.isValid) {
      this.showError(validation.message);
      return false;
    }
    
    return true;
  }

  showError(message) {
    this.emailInput.classList.add('error');
    this.emailError.textContent = message;
    this.emailError.classList.add('show');
    this.emailInput.setAttribute('aria-invalid', 'true');
  }

  clearError() {
    this.emailInput.classList.remove('error');
    this.emailError.classList.remove('show');
    this.emailError.textContent = '';
    this.emailInput.setAttribute('aria-invalid', 'false');
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateEmail()) {
      this.emailInput.focus();
      return;
    }
    
    // Show loading state
    this.setLoadingState(true);
    
    // Simulate API call
    await this.simulateApiCall();
    
    // Show success message
    this.showSuccess();
  }

  setLoadingState(loading) {
    if (loading) {
      this.submitBtn.classList.add('loading');
      this.submitBtn.disabled = true;
      this.submitBtn.setAttribute('aria-busy', 'true');
    } else {
      this.submitBtn.classList.remove('loading');
      this.submitBtn.disabled = false;
      this.submitBtn.setAttribute('aria-busy', 'false');
    }
  }

  async simulateApiCall() {
    // Simulate network delay
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  showSuccess() {
    const email = this.emailInput.value.trim();
    
    // Update success message with user's email
    this.userEmailSpan.textContent = email;
    
    // Hide form and show success message
    this.signupForm.style.display = 'none';
    this.successMessage.classList.add('show');
    
    // Focus on dismiss button for accessibility
    this.dismissBtn.focus();
    
    // Reset loading state
    this.setLoadingState(false);
    
    // Announce success to screen readers
    this.announceToScreenReader('Successfully subscribed to newsletter');
  }

  dismissSuccess() {
    // Hide success message and show form
    this.successMessage.classList.remove('show');
    this.signupForm.style.display = 'grid';
    
    // Reset form
    this.form.reset();
    this.clearError();
    
    // Focus back on email input
    this.emailInput.focus();
  }

  handleKeydown(e) {
    // Allow dismissing success message with Escape key
    if (e.key === 'Escape' && this.successMessage.classList.contains('show')) {
      this.dismissSuccess();
    }
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NewsletterForm();
  
  // Prevent zoom on input focus for iOS
  const inputs = document.querySelectorAll('input[type="email"]');
  inputs.forEach(input => {
    input.addEventListener('touchstart', () => {
      input.style.fontSize = '16px';
    });
  });
});

// Add smooth reveal animation
window.addEventListener('load', () => {
  const container = document.querySelector('.container');
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    container.style.transition = 'all 0.6s ease';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 100);
});