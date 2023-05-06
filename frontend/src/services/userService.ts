type Token = null | string

let token: Token = null;


function setUser(user: {token: string})
{
    window.localStorage.setItem('userLoggedin', JSON.stringify(user));
    token = user.token;
}


function checkIfUserLoggedIn()
{
    const loggedIn = window.localStorage.getItem('userLoggedin');

    if(loggedIn)
    {
        const user = JSON.parse(loggedIn);
        token = user.token;
        return user;
    }

    return null;
}


function getToken(){
    return token;
}

function clearUser(){
    window.localStorage.clear();
    token = null;
}

export default {
    setUser,
    getToken,
    clearUser,
    checkIfUserLoggedIn
}

