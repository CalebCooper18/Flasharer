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


//TODO: Create Deck type for sending to back end and connect it to the reducer
// async function createUserDeck()
// {
//     const res = await fetch(`${baseURl}/deck` {
//         method: 'POST',
//         headers: config(),
//         body: deck
//     }
//     )
// }



export default {
    getAllUserDecks
}