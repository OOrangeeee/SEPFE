// src/utils/csrf.js
import sendRequest from './http';

const CSRF_TOKEN_KEY = 'X-CSRF-Token';
const CSRF_REFRESH_INTERVAL = 30 * 60 * 1000; // 30分钟

async function fetchCSRFToken() {
    try {
        const response = await sendRequest('/csrf-token', 'get');
        if (response.status === 200) {
            const csrfToken = response.headers[CSRF_TOKEN_KEY.toLowerCase()];
            if (csrfToken) {
                sessionStorage.setItem(CSRF_TOKEN_KEY, csrfToken);
                console.log('CSRF Token updated');
            } else {
                console.warn('CSRF Token not found in response headers');
            }
        }
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }
}

let refreshInterval;

function setupCSRFTokenRefresh() {
    // 立即获取一次CSRF令牌
    fetchCSRFToken();

    // 设置定时器，每半小时刷新一次CSRF令牌
    refreshInterval = setInterval(fetchCSRFToken, CSRF_REFRESH_INTERVAL);
}

function clearCSRFTokenRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
}

export { setupCSRFTokenRefresh, clearCSRFTokenRefresh, CSRF_TOKEN_KEY };
