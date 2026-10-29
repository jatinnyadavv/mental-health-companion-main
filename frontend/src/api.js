import { getSessionId } from './session';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://mental-health-companion-main-3jav.vercel.app';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const { timeoutMs, signal, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    'X-Session-Id': getSessionId(),
    ...(fetchOptions.headers || {})
  };
  const controller = timeoutMs ? new AbortController() : null;
  const timeoutId = controller
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  try {
    const requestSignal = signal || controller?.signal;
    const res = await fetch(url, {
      ...fetchOptions,
      headers,
      ...(requestSignal ? { signal: requestSignal } : {})
    });
    if (!res.ok) {
      let errorMsg = `Server error (${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData.detail) {
          if (typeof errorData.detail === 'string') {
            errorMsg = errorData.detail;
          } else if (errorData.detail.detail) {
            errorMsg = errorData.detail.detail;
          } else if (Array.isArray(errorData.detail)) {
            errorMsg = errorData.detail.map(d => d.msg || JSON.stringify(d)).join(', ');
          }
        }
      } catch (e) {
        // Fallback to generic status text
      }
      throw new Error(errorMsg);
    }
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Saathi is taking longer than expected. Please try again.');
    }
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error('Could not connect to the companion server. Please try again in a moment.');
    }
    throw err;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export const api = {
  checkHealth: () => request('/health'),
  predict: (inputs) => request('/predict', { method: 'POST', body: JSON.stringify(inputs) }),
  chat: (messages) => request('/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
    timeoutMs: 20000
  }),
  getHistory: () => request('/history', { method: 'GET' }),
  deleteMyData: () => request('/me', { method: 'DELETE' }),
};
