import axios from 'axios';

// actions
const SEARCH_ADDRESS = 'SEARCH_ADDRESS';

// action creators
export const searchAddress_ = (address) => ({
  type: SEARCH_ADDRESS,
  address: address,
});

export const searchAddress = (keyword) => (dispatch) => axios.get(`/api/address/${keyword}`)
  .then((res) => dispatch(searchAddress_(res.data)))
  .catch(function (error) {
    console.log(error);
  })

// reducer
const InitialState = {
  address: [],
};

export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case SEARCH_ADDRESS:
      return { address: action.address };
    default:
      return state;
  }
};

export default reducer;
