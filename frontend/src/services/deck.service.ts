import { baseURl } from "../utils/constants";
import userService from "./user.service";


function config()
{
    return { 'Authorization': `Bearer ${userService.getToken()}`}
}


async function getAllUserDecks()
{
        const res = await fetch(`${baseURl}/deck/mydecks`, {
            method: 'GET',
            headers: config(),
        })

        const data = await res.json();
        if(res.status !== 200)
        {
            throw new Error(data.error);
        }
        return data;
        
}



export default {
    getAllUserDecks
}