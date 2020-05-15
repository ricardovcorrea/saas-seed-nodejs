import axios from 'axios';

import { baseUrl } from '../General/Constants';

export default () => {
    return {
        getList: (resource:any, params:any) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;

            const url = `${baseUrl}/admin/${resource}?page=${page}&perPage=${perPage}&sortBy=${field}&sort=${order}`;
            const token = localStorage.getItem('token');
            const auth = { headers: { Authorization: `Bearer ${token}` } };

            return axios.get(url, auth).then(({ data }) => ({
                data: data.data,
                total: data.total,
            }));
        },

        getOne: (resource:any, params:any) => {
            const { id } = params;

            const url = `${baseUrl}/admin/${resource}/${id}`;
            const token = localStorage.getItem('token');
            const auth = { headers: { Authorization: `Bearer ${token}` } };

            return axios.get(url, auth).then(({ data }) => ({
                data: data
            }));
        },

        getMany: (resource:any, params:any) => {
            const { ids } = params;

            const url = `${baseUrl}/admin/${resource}/list?ids=${ids.join(',')}`;
            const token = localStorage.getItem('token');
            const auth = { headers: { Authorization: `Bearer ${token}` } };

            return axios.get(url, auth).then(({ data }) => ({
                data: data,
            }));
        },

        getManyReference: (resource:any, params:any) => Promise.resolve(),

        update: (resource:any, params:any) => Promise.resolve(),

        updateMany: (resource:any, params:any) => Promise.resolve(),

        create: (resource:any, params:any) => {
            const url = `${baseUrl}/admin/${resource}`;
            const token = localStorage.getItem('token');
            const auth = { headers: { Authorization: `Bearer ${token}` } };

            return axios.post(url, params.data, auth).then(({ data }) => ({ data }));
        },

        delete: (resource:any, params:any) => {
            const { id } = params;

            const url = `${baseUrl}/admin/${resource}/${id}`;
            const token = localStorage.getItem('token');
            const auth = { headers: { Authorization: `Bearer ${token}` } };

            return axios.delete(url, auth).then(({ data }) => ({
                data: data
            }));
        },

        deleteMany: (resource:any, params:any) => Promise.resolve(),
    }
};