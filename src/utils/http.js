// src/utils/http.js
import axios from 'axios';
import qs from 'qs'; // 用于序列化表单数据

const BASE_URL = 'https://base.polypeye.cn/sep';

async function sendRequest(path, method, params = [], data = null, headers = {}) {
    let url = `${BASE_URL}${path}`;

    // 如果是GET请求且有参数，将参数添加到URL
    if (method.toLowerCase() === 'get' && params.length > 0) {
        url += '/' + params.join('/');
    }

    // 配置请求选项
    const config = {
        method: method,
        url: url,
        headers: {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true, // 允许发送cookies
    };

    // 如果不是GET请求且有数据，序列化数据
    if (method.toLowerCase() !== 'get' && data) {
        config.data = qs.stringify(data);
    }

    try {
        const response = await axios(config);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        if (error.response) {
            // 请求已发出但服务器响应的状态码不在 2xx 范围内
            return {
                error: true,
                data: error.response.data,
                status: error.response.status
            };
        } else if (error.request) {
            // 请求已发出但没有收到响应
            return {
                error: true,
                message: "No response received",
                status: null
            };
        } else {
            // 在设置请求时发生了某些问题
            return {
                error: true,
                message: error.message,
                status: null
            };
        }
    }
}

export default sendRequest;
