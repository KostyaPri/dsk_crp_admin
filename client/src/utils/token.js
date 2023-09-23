function setToken(userToken) {
    sessionStorage.setItem('access-token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('access-token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

export {
    setToken,
    getToken
}