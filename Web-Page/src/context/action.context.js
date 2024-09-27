import {
    CLEAR_UPDATE,
    DELETE_PROJECT,
    GET_DATA_USER,
    GET_PROJECT_DATA,
    HIDE_ADD_PROJECT,
    HIDE_EDIT_PROJECT,
    LOGGED,
    LOGGOUT,
    SHOW_ADD_MEMBER,
    SHOW_ADD_PROJECT,
    SHOW_EDIT_PROJECT,
    UPDATATE_PROJECT,
} from './constant.context';

export const logged = (payload) => {
    return {
        type: LOGGED,
        payload,
    };
};

export const getDataUser = (payload) => {
    return {
        type: GET_DATA_USER,
        payload,
    };
};

export const loggout = (payload) => {
    return {
        type: LOGGOUT,
        payload,
    };
};

export const showEditProject = (payload) => {
    return {
        type: SHOW_EDIT_PROJECT,
        payload,
    };
};

export const hideEditProject = (payload) => {
    return {
        type: HIDE_EDIT_PROJECT,
        payload,
    };
};

export const getProjectData = (payload) => {
    return {
        type: GET_PROJECT_DATA,
        payload,
    };
};

export const updateProject = (payload) => {
    return {
        type: UPDATATE_PROJECT,
        payload,
    };
};

export const deleteProject = (payload) => {
    return {
        type: DELETE_PROJECT,
        payload,
    };
};

export const clearUpdate = (payload) => {
    return {
        type: CLEAR_UPDATE,
        payload,
    };
};

export const showAddProject = (payload) => {
    return {
        type: SHOW_ADD_PROJECT,
        payload,
    };
};

export const hideAddProject = (payload) => {
    return {
        type: HIDE_ADD_PROJECT,
        payload,
    };
};

export const showAddMember = (payload) => {
    return {
        type: SHOW_ADD_MEMBER,
        payload,
    };
};
