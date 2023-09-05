export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

export const setLoginStatus = (isLogin) => {
  return {
    type: 'SET_LOGIN_STATUS',
    payload: isLogin
  };
};
export const setMousePosition = ({ x, y }) => {
  return {
    type: 'SET_MOUSE_POSITION',
    payload: { x: x, y: y }
  };
};
export const setAccessToken = (token) => {
  return {
    type: 'SET_ACCESS_TOKEN',
    payload: token
  }
}