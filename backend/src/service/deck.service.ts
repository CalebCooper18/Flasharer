import Deck, {IDeck, IDeckDocument} from "../models/deck";
import { IUserDocument } from "../models/user";

interface INewDeck extends IDeck {
    user: IUserDocument
}

export async function createNewDeck(deckInput: INewDeck): Promise<IDeckDocument> {
   try {
        const user = deckInput.user;
        
        const deck = new Deck({
            topic: deckInput.topic,
            likedBy: [],
            cards: deckInput.cards,
            tags: deckInput.tags ? deckInput.tags : [],
            createdBy: deckInput.user._id,
            shared: deckInput.shared
        })

       const newDeck = await deck.save();

       user.decks = user.decks?.concat(newDeck.id);

       await user.save();

       return newDeck
    
   } catch (error: unknown) 
   {
        throw new Error('Internal Error');     
   } 
}

export async function getAllSharedDecks() 
{
    try {
        const allSharedDecks = await Deck.find({shared: true});
        return allSharedDecks;
    } catch (error) {
        throw new Error();
    }    
}

export async function getAllUserDecks(user: IUserDocument)
{
    try {   
        const allUserDecks = await Deck.find({createdBy: user._id})
        return allUserDecks;
    } catch (error) {
        throw new Error();
    }
}


export async function findDeck(id: string)
{
    try {
        const deck = await Deck.findById(id);
        return deck;
    } catch (error) {
        return false;
    }
}

export async function deleteDeck(id: string)
{
    return Deck.findByIdAndDelete(id);
}