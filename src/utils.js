export function checkLoginStatus() {
    let token = localStorage.getItem('accessToken');
    if(token === null) {
        return false;
    }
    else {
        return true
    }
}