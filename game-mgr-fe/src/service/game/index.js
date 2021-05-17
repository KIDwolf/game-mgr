import axios from 'axios';

export const add = (form) => {
    return axios.post(
        'http://localhost:3000/game/add',
        form,
    );
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/game/list',
        {
            params: data,
        },
    );
};


export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/game/${id}`,
    );
};


export const updateCount = (data = {}) => {
    return axios.post(
        `http://localhost:3000/game/update/count`,
        data,
    );
};

export const update = (data = {}) => {
    return axios.post(
        `http://localhost:3000/game/update`,
        data,
    );
};



