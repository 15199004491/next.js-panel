export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^1[3-9]\d{9}$/;
  return re.test(phone);
};

export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateIDCard = (idCard: string): boolean => {
  const re = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  return re.test(idCard);
};

export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
  if (!/[a-z]/.test(password)) return { valid: false, message: 'Password must contain lowercase letters' };
  if (!/[A-Z]/.test(password)) return { valid: false, message: 'Password must contain uppercase letters' };
  if (!/[0-9]/.test(password)) return { valid: false, message: 'Password must contain numbers' };
  return { valid: true, message: '' };
};

export const validateNumber = (value: string, min?: number, max?: number): { valid: boolean; message: string } => {
  const num = parseFloat(value);
  if (isNaN(num)) return { valid: false, message: 'Please enter a number' };
  if (min !== undefined && num < min) return { valid: false, message: `Value cannot be less than ${min}` };
  if (max !== undefined && num > max) return { valid: false, message: `Value cannot be greater than ${max}` };
  return { valid: true, message: '' };
};

export const validateRequired = (value: string | undefined | null): { valid: boolean; message: string } => {
  if (!value || value.trim() === '') return { valid: false, message: 'This field is required' };
  return { valid: true, message: '' };
};

export const validateLength = (value: string, min: number, max: number): { valid: boolean; message: string } => {
  const length = value.length;
  if (length < min) return { valid: false, message: `Length must be at least ${min} characters` };
  if (length > max) return { valid: false, message: `Length cannot exceed ${max} characters` };
  return { valid: true, message: '' };
};