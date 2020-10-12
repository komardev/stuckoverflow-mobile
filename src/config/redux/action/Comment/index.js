import API from '../../../api';

export const sendUserComment = (payload) => (dispatch) => {
    const data = {
        body: payload,
    };
    return API.SendComment(data).then(res => {
        return res
    })
};

export const getAllComment = (payload) => (dispatch) => {
    const data = {
        path: payload.id
    };
    return API.GetComment(data).then(res => {
        return res
    })
};

export const deleteComment = (payload) => (dispatch) => {
    const data = {
        path: payload.id
    };
    return API.DeleteComment(data).then(res => {
        return res
    })
};

export const editUserComment = (payload) => (dispatch) => {
    const data = {
        body: payload.data,
        path: payload.path,
    };

    return API.EditComment(data).then(res => {
        return res
    })
};