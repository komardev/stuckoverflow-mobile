import API from '../../../api';

export const getTopicUser = (payload) => (dispatch) => {
    const data = {
        path: payload.id,
    };
    return API.TopicUser(data).then(res => {
        return res
    })
};

export const getAllTopics = (payload) => (dispatch) => {
    return API.Topics().then(res => {
        return res
    })
};

export const createTopic = (payload) => (dispatch) => {
    const data = {
        body: payload.data,
    };

    return API.CreateTopic(data).then(res => {
        return res
    })
};

export const deleteTopic = (payload) => (dispatch) => {
    const data = {
        path: payload.id,
    };

    return API.DeleteTopic(data).then(res => {
        return res
    })
};

export const editUserTopic = (payload) => (dispatch) => {
    const data = {
        body: payload.data,
        path: payload.path,
    };

    return API.EditTopic(data).then(res => {
        return res
    })
};