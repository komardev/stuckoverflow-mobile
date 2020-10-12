const AuthState = {
    userData: []
};

const AuthReducer = (state = AuthState, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                ...state, userData: action.value,
            };
        case 'SET_LOGOUT':
            return {
                ...state, userData: [],
            };

        default:
            return state
    }
};

export default AuthReducer