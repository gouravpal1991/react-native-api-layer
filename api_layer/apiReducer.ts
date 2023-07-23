// apiReducer.ts
import {ApiActionTypes, ApiAction} from './apiTypes';

interface ApiState {
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  loading: false,
  error: null,
};

const apiReducer = (state = initialState, action: ApiAction<any>): ApiState => {
  switch (action.type) {
    case ApiActionTypes.REQUEST:
      return {...state, loading: true, error: null};
    case ApiActionTypes.SUCCESS:
      return {...state, loading: false, error: null};
    case ApiActionTypes.FAILURE:
      return {...state, loading: false, error: action.payload.message};
    default:
      return state;
  }
};

export default apiReducer;
