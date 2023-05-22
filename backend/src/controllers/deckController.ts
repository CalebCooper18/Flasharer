import { IUserDocument } from "../models/user";
import { NextFunction, Request, Response } from "express";
import { createNewDeck, deleteDeck, findDeck, getAllSharedDecks, getAllUserDecks } from "../service/deck.service";
import Deck, { IDeckDocument } from "../models/deck";
// import { UpdateWriteOpResult} from "mongoose";
import AppError from "../utils/appError";


async function createDeckHandler(req: Request, res: Response, next: NextFunction )
{
    try 
    {
        if(!req.body.topic || !req.body.cards || typeof req.body.shared !== 'boolean')
        {
            return next(new AppError('Missing Fields', 400));
        }
        const newDeck = await createNewDeck(req.body);
        return res.status(200).json(newDeck);
        
    } catch (e: unknown) {

        return next(e);
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


async function getSingleDeckHandler(req: Request, res: Response, next: NextFunction)
{
    const id = req.params.id;
    const user: IUserDocument = req.body.user;

    const deck = await findDeck(id);

    if(!deck)
    {
       
        return next(new AppError('Deck does not exist', 404));
    }

    if(!deck.shared && deck.createdBy.toString() !== user._id.toString())
    {
        return next(new AppError('Unauthorized to see this deck', 403));
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

    const deckUpdated =  await deckToUpdate.save();

    return res.status(200).json(deckUpdated);
}

async function updateDeckHandler(req: Request, res: Response, next: NextFunction) 
{
    try
    {

        const deckUpdate: IDeckDocument = req.body.updatedDeck;
        const originalDeck: IDeckDocument = req.body.deck;
        const updatedDeck = await Deck.findByIdAndUpdate(originalDeck.id, deckUpdate, {
            new: true
        })
        return res.status(200).json(updatedDeck);
    }
    catch (error: unknown)
    {
        return next(error);
    } 

}


// NO LONGER NEEDED DUE TO WANTING TO UPDATE THE ENTIRE DECK AS OPPOSED TO ONLY UPDATING BITS OF THE DECK
// KEEPING FOR FUTURE REFERENCE  


// async function updateShareDeckHandler(req: Request, res: Response)
// {
//   const deck : IDeckDocument = req.body.deck;
//   deck.shared = !deck.shared;
//   await deck.save();

//   return res.status(200).json(deck);
// }


// async function deleteCardHandler(req: Request, res: Response)
// {
//     const deck: IDeckDocument = req.body.deck;
//     const cardId = req.params.cardId;
//     const modifiedDeck: UpdateWriteOpResult = await Deck.updateOne({_id: deck._id}, {$pull: {cards: {_id: cardId } } } );

    
//     if(modifiedDeck.modifiedCount === 0)
//     {
//         return res.status(404).json({error: 'The card does not exist'});
//     }
    
//     return res.status(204).end();
// }



// async function updateCardHandler(req: Request, res: Response)
// {
//     const deck: IDeckDocument = req.body.deck;
//     const cardId = req.params.cardId;
//     const {subject, answer}: {subject: unknown, answer: unknown} = req.body;

//     if(!answer || !subject || typeof subject !== 'string' || typeof answer !== 'string' )
//     {
//         return res.status(400).json({error: 'Missing fields'})
//     }

//     const modifiedDeck: UpdateWriteOpResult | null = await Deck.findOneAndUpdate({
//         _id: deck._id,
//          "cards._id": cardId
//     },
//     {
//         $set: {
//             "cards.$.subject": subject,
//             "cards.$.answer": answer
//         }
//     }, 
//     { new: true })
    
//     if(!modifiedDeck)
//     {
//         return res.status(404).json({error: 'No card with matching ID'});
//     }
    
//     return res.status(200).json(modifiedDeck);
// }

// async function addCardHandler(req: Request, res: Response) 
// {
//     const deck: IDeckDocument = req.body.deck;
//     const {subject, answer}: {subject: unknown, answer: unknown} = req.body;

//     if(!subject || !answer || typeof subject !== 'string' || typeof answer !== 'string')
//     {
//         return res.status(400).json({error: 'Card missing fields or incorrect formatting'});
//     }

//     const modifiedDeck: UpdateWriteOpResult | null = await Deck.findOneAndUpdate({
//         _id: deck._id
//     },
//     {
//         $push:
//         {
//             cards: {subject, answer}
//         }
//     },
//     {new: true})

//     if(!modifiedDeck)
//     {
//         return res.status(500).json({error: 'Something went wrong'})
//     }

//     return res.status(200).json(modifiedDeck);
// }


export default{
    createDeckHandler,
    getAllSharedDecksHandler,
    deleteDeckHandler,
    getAllUsersDecksHandler,
    getSingleDeckHandler,
    updateLikesDeckHandler,
    updateDeckHandler
    // updateShareDeckHandler,
    // deleteCardHandler,
    // updateCardHandler,
    // addCardHandler
}