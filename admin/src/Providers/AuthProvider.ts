import axios from 'axios';

import { baseUrl } from '../General/Constants';

export default () => {
    return {
        login: async (params: any) => {
            const url = `${baseUrl}/admin/auth/token`;

            const { username, password } = params;

            try {
                const loginResponse = await axios.post(url, { email: username, password });
                
                localStorage.setItem('token', loginResponse.data.token);
                localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

            } catch (error) {
                if (error && error.response && error.response.data.message) {
                    throw error.response.data.message;
                }
                throw "An error has occured!";
            }
        },
        logout: async () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        checkAuth: async () => { 
            const token = localStorage.getItem('token');
            if(!token) {
                throw {
                    message: "You need to login again!"
                };
            }
        },
        checkError: (error:any) => Promise.resolve(),
        getPermissions: (params:any) => Promise.resolve(),
    }
};