import axios from 'axios';

const GET_TUTOR = "GET_TUTOR";
const GET_REVIEW_BY_ID = "GET_REVIEW_BY_ID";

// create action


/* tutor의 리스트를 요구합니다.
gender와 subject는 각각 2비트, 5비트의 integer로 전송됩니다. 기본적으로 모두 체크된 상태이므로 3, 31을 보냅니다.
각각의 비트에 대해서 0과 1로 구현되어 있으므로 각각의 bit에 대해서 & 연산을 하면 수치가 나옵니다.

gender는
& 1을 하면 Male
& 2를 하면 Female
의 현 checkbox가 나옵니다. 

subject는
& 1을 하면 Korean
& 2를 하면 English
& 4를 하면 Math
& 8를 하면 Social study
& 16을 하면 Science
의 현 checkbox가 나옵니다. 
*/
export const getTutor_ = (tutors) => ({
    type: GET_TUTOR,
    tutors: tutors
})

export const getTutor = (childID, gender, subject, minAge, maxAge) => (dispatch) => {
    console.log(gender, subject, minAge, maxAge);
    axios.post('tutee/tutoring/'+ childID +'/', {gender: gender, subject: subject, minAge: minAge, maxAge: maxAge})
        .then((res) => dispatch(getTutor_(res.data)));
}


export const getReviewByID_ = (reviews) => ({
    type: GET_REVIEW_BY_ID,
    reviewByID: reviews
})
export const getReviewByID = (id) => (dispatch) => {
    axios.get('tutee/review/' + id + '/')
        .then((res) => dispatch(getReviewByID_(res.data)));
}

// reducer
const InitialState = {
    tutors: [],
    reviewByID: []
}

export const reducer = (state = InitialState, action) => {
    switch(action.type) {
        case GET_TUTOR:
            return { ...state, tutors: action.tutors};
        case GET_REVIEW_BY_ID:
            return { ...state, reviewByID: action.reviewByID};
        default:
            return state;
    }
}

export default reducer;