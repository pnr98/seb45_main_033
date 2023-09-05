import { SET_LOGIN_STATUS } from '../action/action';

const initialState = {
  isLogin: false,
  productList: [],
  position: { x: 0, y: 0 },
  isHover: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATUS':
      return { ...state, isLogin: action.payload };
    case 'SET_MOUSE_POSITION':
      return { ...state, position: action.payload };
    default:
      return state;
  }
};
export default rootReducer;
