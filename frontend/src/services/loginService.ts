import { baseURl } from "../utils/constants";
import { UserLogin } from "../Types";

async function login(creds: UserLogin) 
{
    const res = await fetch(`${baseURl}/user/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    });
    const data = await res.json();
    console.log(res.status);
    console.log(data);
    return 'hello';
}


export default {
    login
}