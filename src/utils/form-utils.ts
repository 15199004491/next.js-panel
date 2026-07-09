import type { ChangeEvent } from 'react';

export interface FormField {
  value: string | number | boolean | undefined;
  error: string;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

export const createFormState = (fields: string[]): FormState => {
  const state: FormState = {};
  fields.forEach(field => {
    state[field] = { value: '', error: '', touched: false };
  });
  return state;
};

export const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, formState: FormState): FormState => {
  const { name, value } = e.target;
  return { ...formState, [name]: { ...formState[name], value, touched: true } };
};

export const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, formState: FormState): FormState => {
  const { name, checked } = e.target;
  return { ...formState, [name]: { ...formState[name], value: checked, touched: true } };
};

export const validateForm = (formState: FormState, validators: Record<string, (value: unknown) => { valid: boolean; message: string }>): FormState => {
  const newState: FormState = { ...formState };
  Object.keys(validators).forEach(field => {
    const validator = validators[field];
    const fieldState = formState[field];
    if (fieldState.touched) {
      const result = validator(fieldState.value);
      newState[field] = { ...fieldState, error: result.valid ? '' : result.message };
    }
  });
  return newState;
};

export const isFormValid = (formState: FormState): boolean => Object.values(formState).every(field => field.error === '');

export const getFormData = (formState: FormState): Record<string, unknown> => {
  const data: Record<string, unknown> = {};
  Object.keys(formState).forEach(field => {
    data[field] = formState[field].value;
  });
  return data;
};

export const resetForm = (formState: FormState): FormState => {
  const newState: FormState = {};
  Object.keys(formState).forEach(field => {
    newState[field] = { value: '', error: '', touched: false };
  });
  return newState;
};