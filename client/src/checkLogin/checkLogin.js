export const checkLogin = () => {
    const token = sessionStorage.getItem('Token')
    if(token) return true
    else return false
}