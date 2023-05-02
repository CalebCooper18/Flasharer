import { IUserDocument } from "../models/user";
import Deck, { IDeck } from "../models/deck";
import { Request, Response } from "express";
import { createNewDeck, deleteDeck, findDeck, getAllSharedDecks } from "../service/deck.service";


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

async function getSingleDeckHandler(req: Request, res: Response)
{

}

async function deleteDeckHandler(req: Request, res: Response)
{
    const user : IUserDocument = req.body.user;
    const id = req.params.id;

    const deckToDelete = await findDeck(id);

    if(!deckToDelete)
    {
        return res.status(404).json({error: 'Deck does not exist'});
    }

    if(deckToDelete.createdBy.toString() !== user._id.toString())
    {
        return res.status(403).json({error: 'Unauthorized access'});
    }

    await deleteDeck(id);
    user.decks = user.decks?.filter(deck => deck.toString() !== id.toString());
    await user.save();
    return res.status(204).end();
}



export default{
    createDeckHandler,
    getAllSharedDecksHandler,
    deleteDeckHandler
}