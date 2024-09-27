import { LOGGED, LOGGOUT } from './constant.context';

export const initState = {
    login: false,
};

export const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case LOGGED: {
            return {
                ...state,
                login: true,
                userData: action.payload,
            };
        }

        case LOGGOUT: {
            return initState;
        }

        default: {
            console.log('Invalid Action');
            console.log('Fail: ', action);
            return state;
        }
    }
};
