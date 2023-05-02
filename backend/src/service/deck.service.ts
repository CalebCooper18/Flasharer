import Deck, {IDeck, IDeckDocument} from "../models/deck";
import { IUserDocument } from "../models/user";

interface INewDeck extends IDeck {
    user: IUserDocument
}

export async function createNewDeck(deckInput: INewDeck): Promise<IDeckDocument> {
   try 
   {
        const user = deckInput.user;

        const deck = new Deck({
            topic: deckInput.topic,
            likedBy: [],
            cards: deckInput.cards,
            tags: deckInput.tags ? deckInput.tags : [],
            createdBy: deckInput.user._id,
            shared: deckInput.shared
        })

       const newDeck =  await deck.save();

       user.decks = user.decks?.concat(newDeck.id);

       await user.save();

       return newDeck
    
   } catch (error: unknown) {
        throw new Error(error as string)
   } 
}