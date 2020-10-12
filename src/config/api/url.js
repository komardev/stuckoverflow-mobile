const development = {
    url: {
        api: 'http://192.168.43.78:2077'
    },
}

export const config = development;

const baseUrl = {
    register: `${config.url.api}/user-regist`,
    login: `${config.url.api}/user-login`,
    topicUser: `${config.url.api}/topic-user`,
    topics: `${config.url.api}/topics`,
    topic: `${config.url.api}/topic`,
    comment: `${config.url.api}/comment`,
    comments: `${config.url.api}/comments`

};

export default baseUrl;