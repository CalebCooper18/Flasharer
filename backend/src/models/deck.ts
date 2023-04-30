import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
   topic: {
        type: String,
        required: true
   },
   likes: {
        type: Number,
        default: 0
   },
   cards: [{
     front: {
          type: String,
          required: true
     },
     back: {
          type: String,
          required: true
     },
     required: true
   }],
   tags: [ {
     type: String
   }],
   user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   }
})

deckSchema.set('toJSON', {
     transform: (_document, returnedObject) => {
          returnedObject.id = returnedObject._id.toString();
          delete returnedObject._id;
          delete returnedObject.__v;
     } 
});

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;