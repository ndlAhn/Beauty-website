import {
    CLEAR_UPDATE,
    DELETE_PROJECT,
    GET_DATA_USER,
    GET_PROJECT_DATA,
    HIDE_ADD_MEMBER,
    HIDE_ADD_PROJECT,
    HIDE_EDIT_PROJECT,
    LOGGED,
    LOGGOUT,
    SHOW_ADD_MEMBER,
    SHOW_ADD_PROJECT,
    SHOW_EDIT_PROJECT,
    UPDATATE_PROJECT,
} from './constant.context';

export const initState = {
    login: false,
    userData: {
        type: 'member',
    },
    editProject: null,
};

export const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case LOGGED: {
            return {
                ...state,
                login: true,
            };
        }
        case GET_DATA_USER: {
            return {
                ...state,
                userData: action.payload,
            };
        }
        case LOGGOUT: {
            return initState;
        }

        case SHOW_EDIT_PROJECT: {
            return {
                ...state,
                editProject: {
                    status: true,
                    data: action.payload,
                },
            };
        }

        case HIDE_EDIT_PROJECT: {
            return {
                ...state,
                editProject: null,
            };
        }

        case GET_PROJECT_DATA: {
            return {
                ...state,
                projects: action.payload,
            };
        }

        case UPDATATE_PROJECT: {
            return {
                ...state,
                projectUpdated: {
                    status: true,
                    data: action.payload,
                },
            };
        }

        case CLEAR_UPDATE: {
            return {
                ...state,
                projectUpdated: {
                    status: false,
                    data: '',
                },
            };
        }

        case DELETE_PROJECT: {
            return {
                ...state,
            };
        }

        case SHOW_ADD_PROJECT: {
            return {
                ...state,
                addProject: {
                    status: true,
                },
            };
        }
        case HIDE_ADD_PROJECT: {
            return {
                ...state,
                addProject: false,
            };
        }

        case SHOW_ADD_MEMBER: {
            return {
                ...state,
                addMember: true,
            };
        }

        case HIDE_ADD_MEMBER: {
            return {
                ...state,
                addMember: false,
            };
        }
        default: {
            console.log('Invalid Action');
            console.log('Fail: ', action);
            return state;
        }
    }
};
