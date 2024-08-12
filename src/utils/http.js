// src/utils/http.js
import axios from 'axios';

// 设置 axios 默认配置，确保每个请求都能发送和接收 cookies
axios.defaults.withCredentials = true;

const BASE_URL = 'http://47.116.177.26/sep';

async function sendRequest(path, method, data = null, config = {}) {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await axios({
            method: method,
            url: url,
            data: method === 'get' ? null : data,
            params: method === 'get' ? data : null,
            ...config
        });
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
