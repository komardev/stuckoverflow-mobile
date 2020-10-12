import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: '',
    timeout: 10000,
    validateStatus: (status) => status >= 200 && status < 300,
});

class ApiRequest {
    static get(route) {
        return (payload) => this.request('GET', route, payload);
    }

    static put(route) {
        return (payload) => this.request('PUT', route, payload);
    }

    static post(route) {
        return (payload) => this.request('POST', route, payload);
    }

    static delete(route) {
        return (payload) => this.request('DELETE', route, payload);
    }

    static request(method, route, payload = {}, t) {
        return new Promise((resolve, reject) => {
            const path = payload.path ? `/${payload.path}` : '';
            console.log(route + path, 'axios');

            const customUrl = payload.url ? payload.url : '';

            const baseHeaders = {
                'Content-Type':
                    payload.type === 'form-data'
                        ? 'multipart/form-data'
                        : 'application/json',
            };

            apiInstance
                .request({
                    url: customUrl.length > 0 ? customUrl : route + path,
                    method,
                    headers: payload.headers
                        ? { ...baseHeaders, ...payload.headers }
                        : baseHeaders,
                    data: payload.body ? payload.body : {},
                })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }
}

export default ApiRequest;