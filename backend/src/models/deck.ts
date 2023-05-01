import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
   topic: {
        type: String,
        required: true
   },
   likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
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
     }
   }],
   tags: [ {
     type: String
   }],
   createdBy: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
   },
   shared:
   {
     type: Boolean,
     required: true,
     default: true
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