import { IUserDocument } from "../models/user";
import Deck, { IDeck } from "../models/deck";
import { Request, Response } from "express";
import { createNewDeck } from "../service/deck.service";


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
        const allSharedDecks = await Deck.find({shared: {$eq: true}})
        return res.status(200).json(allSharedDecks);

    } catch (error) 
    {

       return  res.status(500).json({error: 'Something went wrong'});
    }
}

async function deleteDeckHandler(req: Request, res: Response)
{
    const user : IUserDocument = req.body.user;
    const id = req.params.id;


    if(!user || !id)
    {
        return res.status(400).json('Missing fields');
    }


    const deckToDelete = await Deck.findById(id);

    if(!deckToDelete)
    {
        return res.status(400).json({error: 'Deck does not exist'});
    }

    if(deckToDelete.createdBy.toString() !== user._id.toString())
    {
        return res.status(401).json({error: 'Unauthorized access'});
    }

    await Deck.findByIdAndDelete(id.toString());
    user.decks = user.decks?.filter(deck => deck.toString() !== id.toString());
    await user.save();
    return res.status(204).end();
}



export default{
    createDeckHandler,
    getAllSharedDecksHandler,
    deleteDeckHandler
}