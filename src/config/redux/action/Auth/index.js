import API from '../../../api';
import AsyncStorage from '@react-native-community/async-storage';

export const registerUser = (payload) => (dispatch) => {
    const data = {
        body: payload,
    };
    return API.Register(data).then(res => {
        return res
    })
};

export const loginUser = (payload) => (dispatch) => {
    const data = {
        body: {
            userAcc: payload.userAcc,
            password: payload.password
        }
    };
    return API.Login(data).then(async (res) => {
        if (!res.error) {
            await AsyncStorage.setItem('user_data', JSON.stringify(res), (err) => {
                console.log('err', err);
            })
            dispatch({ type: 'SET_LOGIN', value: res });
        }
        return res
    });
};

export const logoutUser = (payload) => (dispatch) => {
    AsyncStorage.removeItem('user_data', () => {
        dispatch({ type: 'SET_LOGOUT' });
    })
};

export const reLogin = (payload) => (dispatch) => {
    dispatch({ type: 'SET_LOGIN', value: payload });
};