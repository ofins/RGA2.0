const initialState = {userName:'', password:'', isLoggedIn:true};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'login':
            return {
                userName: payload.userName,
                password: payload.password,
                isLoggedIn: true,
            }
        case 'logout':
            return {userName:'', password:'', isLoggedIn: false};
        default:
            return state
    }
}
