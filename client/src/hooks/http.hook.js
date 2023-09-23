import { useState, useCallback } from "react";
import Cookies from 'js-cookie';

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}, isFile = false) => {

        setProcess('loading');
        try {
            headers['Authorization'] = `Bearer ${sessionStorage.getItem('access-token')}`;

            if (body) {

                const formData = new FormData();

                const appendFormData = (data, parentKey = '') => {
                    for (let key in data) {
                        if (data.hasOwnProperty(key)) {
                            const value = data[key];
                            const fullKey = parentKey ? `${parentKey}.${key}` : key;

                            if (typeof value === 'object' && value !== null) {
                                if (value instanceof File) {
                                    formData.append(fullKey, value); // Додати файл до formData
                                } else {
                                    appendFormData(value, fullKey); // Рекурсивний виклик для вкладених об'єктів
                                }
                            } else {
                                formData.append(fullKey, value);
                            }
                        }
                    };
                };

                appendFormData(body)

                body = formData;
            }

            const response = await fetch(url, { method, body, headers });

            if (response.status === 204) {
                return null;
            }

            if (response.status === 401) {
                sessionStorage.removeItem('access-token');
                window.location.reload();
            }

            let data;

            if (isFile) {
                data = await response.blob();
            } else {
                data = await response.json();
            }

            if (!response.ok) {
                console.log(`Could not fetch ${url}, status: ${response.status}`);
                throw new Error(data.detail || 'Something went wrong');
                // throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            setError(null);
            // setProcess('confirmed');
            return data;
        } catch (e) {
            setProcess('error');
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading');
        setError(null);
    }, []);

    return { request, clearError, process, setProcess, error };
}