import axios from 'axios';

// === === ACTION === ===

// === TUTEE MANAGER PROFILE PART ===
const GET_TUTEE_MANAGER = "GET_TUTEE_MANAGER";
const SEND_CHILD_ID = "SEND_CHILD_ID";

export const getTuteeManager_ = (data) => {
    return {
        type: GET_TUTEE_MANAGER,
        // 확정 아닙니다 데이터 보내주시는 거에 따라서 바꿀거에용
        tutee_manager: data.tutee_manager,
        children: data.children
    };
}

// should put backend address here in axios
export const getTuteeManager = () => {
    return dispatch => {
        return axios.get('/api/getTuteemanager') //여기에 주소 넣어야함!!
            .then((res) => dispatch(getTuteeManager_(res.data)));
    }
}


export const sendChildID = (id) => ({
    type: SEND_CHILD_ID,
    sentChildID: id
})


// === TUTOR PROFILE PART ===
const GET_TUTOR = "GET_TUTOR";
const SEND_TUTOR_ID = "SEND_TUTOR_ID";
const GET_REQUEST_FROM_TUTEE = "GET_REQUEST_FROM_TUTEE";

export const getTutor_ = (tutor) => {
    return {
        type: GET_TUTOR,
        tutor: tutor
    };
}

// should put backend address here in axios
export const getTutor = () => {
    return dispatch => {
        return axios.get('/api/뭐시기')
        .then((res) => dispatch(getTutor_(res.data)));
    }
}

export const sendTutorID = (id) => ({
    type: SEND_TUTOR_ID,
    sentTutorID: id
})

export const getRequstFromTutee_ = (requests) => ({
    type: GET_REQUEST_FROM_TUTEE,
    requests: requests
})

export const getRequstFromTutee = (id) => {
    return dispatch => {
        return axios.get('/api/뭐시기')
            .then((res) => dispatch(getRequstFromTutee_(res.data)));
    }
}


// === ===  reducer === ===
const initialState = {
    tutee_manager: null,
    children: [],
    tutor: null,
    sentChildID: -1,
    requests: []
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TUTEE_MANAGER:
            return {...state, tutee_manager: action.tutee_manager, children: action.children};
        case SEND_CHILD_ID:
            return {...state, sentChildID: action.sentChildID};
        case GET_TUTOR:
            return {...state, tutor: action.tutor};
        default:
            return state;
    }
}
export default reducer;