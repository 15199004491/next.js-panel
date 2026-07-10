const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const TIMEOUT = 20000;

interface RequestOptions extends RequestInit {
  showLoading?: boolean;
  loadingTimeout?: number;
}

interface ResponseData<T = unknown> {
  code?: number;
  message?: string;
  data?: T;
}

export const createFetch = async <T = unknown>(
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { showLoading = false, loadingTimeout = 2000, ...fetchOptions } = options;

  let loadingTimer: ReturnType<typeof setTimeout> | null = null;

  if (showLoading) {
    loadingTimer = setTimeout(() => {
      console.log('Loading...');
    }, loadingTimeout);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      handleResponseError(response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ResponseData<T> = await response.json();

    if (result.code !== undefined && result.code !== 0 && result.code !== 200) {
      throw new Error(result.message || 'Request failed');
    }

    return result.data !== undefined ? result.data : (result as unknown as T);
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.error('Request Timeout');
    } else if ((error as Error).name === 'TypeError' && (error as Error).message.includes('Failed to fetch')) {
      console.error('Network Error');
    }
    throw error;
  } finally {
    if (loadingTimer) {
      clearTimeout(loadingTimer);
    }
    clearTimeout(timeoutId);
  }
};

const handleResponseError = (status: number): void => {
  switch (status) {
    case 401:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      break;
    case 403:
      console.error('Forbidden: You do not have permission');
      break;
    case 404:
      console.error('Not Found: Resource not found');
      break;
    case 500:
      console.error('Server Error: Please try again later');
      break;
    default:
      console.error(`Error: ${status}`);
  }
};

export const get = async <T = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>,
  options?: Omit<RequestOptions, 'method'>
): Promise<T> => {
  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  return createFetch<T>(`${url}${queryString}`, {
    ...options,
    method: 'GET',
  });
};

export const post = async <T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  options?: Omit<RequestOptions, 'method'>
): Promise<T> => {
  return createFetch<T>(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
};

export const put = async <T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  options?: Omit<RequestOptions, 'method'>
): Promise<T> => {
  return createFetch<T>(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
};

export const del = async <T = unknown>(
  url: string,
  params?: Record<string, string | number | boolean>,
  options?: Omit<RequestOptions, 'method'>
): Promise<T> => {
  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  return createFetch<T>(`${url}${queryString}`, {
    ...options,
    method: 'DELETE',
  });
};

export default createFetch;