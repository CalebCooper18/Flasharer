import { baseURl } from "../utils/constants";

import { UserCreate } from "../types";

async function createAccount(creds: UserCreate)
{
    const res = await fetch(`${baseURl}/user/signup`, {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    }) 
    const data = await res.json();
    if(res.status !== 201)
    {
        throw new Error(data.error);
    }
    return data.data
}

export default {
    createAccount
}