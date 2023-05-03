import { IUserDocument } from "../models/user";
import { Request, Response } from "express";
import { createNewDeck, deleteDeck, findDeck, getAllSharedDecks, getAllUserDecks } from "../service/deck.service";
import { IDeckDocument } from "../models/deck";


async function createDeckHandler(req: Request, res: Response )
{
    try {
        const newDeck = await createNewDeck(req.body);
        return res.status(200).json(newDeck);
        
    } catch (error: any) {

        return res.status(400).json(error.message);
    }
}

async function getAllSharedDecksHandler(_req: Request, res: Response)
{
    try 
    {
        const allSharedDecks = await getAllSharedDecks();
        return res.status(200).json(allSharedDecks);

    } catch (error) 
    {
       return res.status(500).json({error: 'Something went wrong'});
    }
}

async function getAllUsersDecksHandler(req: Request, res: Response){
   const user: IUserDocument = req.body.user;
   try 
   {
        const allUserDecks = await getAllUserDecks(user);
        return res.status(200).json(allUserDecks);

   } catch (error) 
   {
        return res.status(500).json({error: "Something went wrong"});
   }
}


async function getSingleDeckHandler(req: Request, res: Response)
{
    const id = req.params.id;
    const user: IUserDocument = req.body.user;

    const deck = await findDeck(id);

    if(!deck)
    {
        return res.status(404).json({error: 'Deck does not exist'});
    }

    if(!deck.shared && deck.createdBy.toString() !== user._id.toString())
    {
        return res.status(403).json({error: 'Unauthorized'})
    }
    
    return res.status(200).json(deck);
}

async function deleteDeckHandler(req: Request, res: Response)
{
    const user : IUserDocument = req.body.user;
    const deck: IDeckDocument = req.body.deck;
    const id: string = deck._id.toString()
    await deleteDeck(id);
    user.decks = user.decks?.filter(deck => deck._id.toString() !== id);
    await user.save();
    return res.status(204).end();
}

// async function updateShareDeckHandler(req: Request, res: Response)
// {
//     const user: IUserDocument = req.body.res;
//     const id = req.params.id;

//     const deckToUpdate = await findDeck(id);

// }



export default{
    createDeckHandler,
    getAllSharedDecksHandler,
    deleteDeckHandler,
    getAllUsersDecksHandler,
    getSingleDeckHandler
}