// src/utils/http.js
import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'http://localhost:714';
const CSRF_TOKEN_KEY = 'X-CSRF-Token';

function updateCSRFToken(headers) {
    const csrfToken = headers[CSRF_TOKEN_KEY.toLowerCase()];
    if (csrfToken) {
        sessionStorage.setItem(CSRF_TOKEN_KEY, csrfToken);
        console.log('CSRF Token updated');
    }
}

async function sendRequest(path, method, params = [], data = null, headers = {}) {
    let url = `${BASE_URL}${path}`;

    if (method.toLowerCase() === 'get' && params.length > 0) {
        url += '/' + params.join('/');
    }

    const csrfToken = sessionStorage.getItem(CSRF_TOKEN_KEY);

    const config = {
        method: method,
        url: url,
        headers: {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded',
            [CSRF_TOKEN_KEY]: csrfToken // 添加现有的CSRF令牌到请求头
        },
        withCredentials: true,
    };

    if (method.toLowerCase() !== 'get' && data) {
        config.data = qs.stringify(data);
    }

    try {
        const response = await axios(config);

        // 检查响应头中是否有新的CSRF令牌，如果有则更新
        updateCSRFToken(response.headers);

        return {
            data: response.data,
            status: response.status,
            headers: response.headers
        };
    } catch (error) {
        if (error.response) {
            // 即使在错误响应中，也检查是否有新的CSRF令牌
            updateCSRFToken(error.response.headers);

            return {
                error: true,
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers
            };
        } else if (error.request) {
            return {
                error: true,
                message: "No response received",
                status: null
            };
        } else {
            return {
                error: true,
                message: error.message,
                status: null
            };
        }
    }
}

export default sendRequest;
