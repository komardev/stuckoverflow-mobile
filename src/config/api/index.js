import ApiRequest from './config';
import baseUrl from './url';

const API = {};

API.Register = ApiRequest.post(baseUrl.register);
API.Login = ApiRequest.post(baseUrl.login);
API.TopicUser = ApiRequest.get(baseUrl.topicUser);
API.Topics = ApiRequest.get(baseUrl.topics);
API.DeleteTopic = ApiRequest.delete(baseUrl.topic);
API.CreateTopic = ApiRequest.post(baseUrl.topic);
API.EditTopic = ApiRequest.put(baseUrl.topic);
API.SendComment = ApiRequest.post(baseUrl.comment)
API.GetComment = ApiRequest.get(baseUrl.comments)
API.DeleteComment = ApiRequest.delete(baseUrl.comment)
API.EditComment = ApiRequest.put(baseUrl.comment);





export default API