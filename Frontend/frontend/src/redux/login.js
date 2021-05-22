import axios from 'axios';

const IS_LOGGED_IN = 'IS_LOGGED_IN';
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

// action creators
export const login_ = (data) => {
  return ({
    type: LOG_IN,
  })
}

export const login = (login_info) =>
  axios.post('/api/signin/', login_info)

export const logout_ = () => ({
  type: LOG_OUT
})

export const logout = () => (dispatch) => {
  axios.get('/signout/')
    .then((res) => dispatch(logout_()));
}

export const isLoggedIn = () => {
  return dispatch => {
    return axios
      .get("/api/isloggedin/")
      .then(res => {
        if(res.status==200){
          dispatch(isLoggedIn_(res.data));
        } else {
          dispatch(isLoggedIn_(false))
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(isLoggedIn_(false));
      });
  };
};

export const isLoggedIn_ = res => {
  return {
    type: IS_LOGGED_IN,
    authenticated: res
  };
};

// reducer
const InitialState = {
  authenticated: false,
};

export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, };
    case LOG_OUT:
      return state;
    case IS_LOGGED_IN:
      return{...state, authenticated: action.authenticated}
    default:
      return state;
  }
};

export default reducer;