import { combineReducers } from 'redux';
import _ from 'lodash';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USER_NAMES':
      return { ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};

const reducers = combineReducers({
  users: usersReducer,
});

export default reducers;
