import { LOGGED, LOGGOUT } from './constant.context';

export const logged = (payload) => {
    return {
        type: LOGGED,
        payload,
    };
};

export const loggout = (payload) => {
    return {
        type: LOGGOUT,
        payload,
    };
};
