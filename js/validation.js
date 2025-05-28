// Form Validation Utilities
class FormValidator {
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateEmail(email) {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      return { isValid: false, message: 'Valid email required' };
    }
    
    if (!this.isValidEmail(trimmedEmail)) {
      return { isValid: false, message: 'Valid email required' };
    }
    
    return { isValid: true, message: '' };
  }
}