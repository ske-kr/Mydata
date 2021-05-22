import axios from 'axios';

// actions
const SIGN_UP_TUTOR = 'SIGN_UP_TUTOR';
const SIGN_UP_TUTEE = 'SIGN_UP_TUTEE';
const UNIQUE = 'UNIQUE';

// action creators
export const signUpTutor = (tutor) => axios.post('/api/signup/tutor/', tutor)
  // (dispatch) => axios.post('/signup/tutor/', tutor)
  //   .then(res => console.log(res.data))

export const signUpTutee = (tutee) => axios.post('/api/signup/tutee/', tutee);

export const uniqueID = (id) => axios.get(`/api/signup/uniqueid/${id}`)

// reducer
const InitialState = {
  unique: null,
}

export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case UNIQUE:
      return {...state, unique: action.unique}
    default:
      return state;
  }
};

export default reducer;
