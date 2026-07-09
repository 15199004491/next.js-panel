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
  if (password.length < 8) return { valid: false, message: '密码长度至少8位' };
  if (!/[a-z]/.test(password)) return { valid: false, message: '密码必须包含小写字母' };
  if (!/[A-Z]/.test(password)) return { valid: false, message: '密码必须包含大写字母' };
  if (!/[0-9]/.test(password)) return { valid: false, message: '密码必须包含数字' };
  return { valid: true, message: '' };
};

export const validateNumber = (value: string, min?: number, max?: number): { valid: boolean; message: string } => {
  const num = parseFloat(value);
  if (isNaN(num)) return { valid: false, message: '请输入数字' };
  if (min !== undefined && num < min) return { valid: false, message: `数值不能小于${min}` };
  if (max !== undefined && num > max) return { valid: false, message: `数值不能大于${max}` };
  return { valid: true, message: '' };
};

export const validateRequired = (value: string | undefined | null): { valid: boolean; message: string } => {
  if (!value || value.trim() === '') return { valid: false, message: '此字段为必填项' };
  return { valid: true, message: '' };
};

export const validateLength = (value: string, min: number, max: number): { valid: boolean; message: string } => {
  const length = value.length;
  if (length < min) return { valid: false, message: `长度不能少于${min}个字符` };
  if (length > max) return { valid: false, message: `长度不能超过${max}个字符` };
  return { valid: true, message: '' };
};