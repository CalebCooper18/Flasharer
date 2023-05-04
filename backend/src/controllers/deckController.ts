import { IUserDocument } from "../models/user";
import { Request, Response } from "express";
import { createNewDeck, deleteDeck, findDeck, getAllSharedDecks, getAllUserDecks } from "../service/deck.service";
import Deck, { IDeckDocument } from "../models/deck";
import { UpdateWriteOpResult} from "mongoose";


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


async function updateShareDeckHandler(req: Request, res: Response)
{
  const deck : IDeckDocument = req.body.deck;
  deck.shared = !deck.shared;
  await deck.save();

  return res.status(200).json(deck);
}

async function updateLikesDeckHandler(req: Request, res: Response)
{
    const user : IUserDocument = req.body.user;
    const id : string = req.params.id;
    const deckToUpdate = await findDeck(id);

    if(!deckToUpdate)
    {
        return res.status(404).json({error: 'Deck does not exist'});
    }

    const indexOfUserLikedId = deckToUpdate.likedBy.indexOf(user._id.toString());

    if(indexOfUserLikedId !== -1)
    {
        deckToUpdate.likedBy.splice(indexOfUserLikedId, 1);
        deckToUpdate.likes = deckToUpdate.likes - 1;
    }
    else 
    {
        deckToUpdate.likedBy.push(user._id.toString());
        deckToUpdate.likes =  deckToUpdate.likes + 1;
    }

    await deckToUpdate.save();

    return res.status(200).json(deckToUpdate);
}

async function deleteCardHandler(req: Request, res: Response)
{
    const deck: IDeckDocument = req.body.deck;
    const cardId = req.params.cardId;
    const modifiedDeck: UpdateWriteOpResult = await Deck.updateOne({_id: deck._id}, {$pull: {cards: {_id: cardId } } } );

    
    if(modifiedDeck.modifiedCount === 0)
    {
        return res.status(404).json({error: 'The card does not exist'});
    }
    
    return res.status(204).end();
}

async function updateCardHandler(req: Request, res: Response)
{
    const deck: IDeckDocument = req.body.deck;
    const cardId = req.params.cardId;
    const {subject, answer} = req.body.newCard;

    if(!answer || !subject)
    {
        return res.status(400).json({error: 'Missing fields'})
    }

    const modifiedDeck: UpdateWriteOpResult | null = await Deck.findOneAndUpdate({
        _id: deck._id,
         "cards._id": cardId
    },
    {
        $set: {
            "cards.$.subject": subject,
            "cards.$.answer": answer
        }
    }, 
    { new: true })
    
    if(!modifiedDeck)
    {
        return res.status(404).json({error: 'No card with matching ID'});
    }
    
    return res.status(200).json(modifiedDeck);
}


export default{
    createDeckHandler,
    getAllSharedDecksHandler,
    deleteDeckHandler,
    getAllUsersDecksHandler,
    getSingleDeckHandler,
    updateShareDeckHandler,
    updateLikesDeckHandler,
    deleteCardHandler,
    updateCardHandler
}