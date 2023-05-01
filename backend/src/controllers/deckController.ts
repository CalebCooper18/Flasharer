import { IUserDocument } from "../models/user";
import Deck from "../models/deck";
import { Request, Response } from "express";


async function createDeck(req: Request, res: Response )
{
    const {user, topic, cards, shared, tags} = req.body;

    if(!user || !topic || !cards || shared === undefined)
    {
        return res.status(400).json({error: 'Missing fields'});
    }

    const deck = new Deck({
        topic,
        cards,
        shared,
        createdBy: user._id,
        likedBy: [],
        tags: tags ? tags : []
    })

    const newDeck = await deck.save();

    user.decks = user.decks.concat(newDeck.id);

    await user.save();

    return res.status(201).json(newDeck);
}

async function getAllSharedDecks(_req: Request, res: Response)
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

async function deleteDeck(req: Request, res: Response)
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
    createDeck,
    getAllSharedDecks,
    deleteDeck
}