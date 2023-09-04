export const setLoginStatus = (status) => {
  return {
    type: 'SET_LOGIN_STATUS',
    payload: status
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