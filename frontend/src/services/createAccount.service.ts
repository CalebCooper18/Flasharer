import { baseURl } from "../utils/constants";
import { userCreate } from "../types";

async function createAccount(creds: userCreate)
{
    const res = await fetch(`${baseURl}/user/signup`, {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    console.log(res);
    const data = await res.json();
    console.log(data);
    // console.log(data);
}

export default {
    createAccount
}