import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true,
        minLength: 5,
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
})

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__v,
        delete returnedObject.hashPassword
    }
});

const User = mongoose.model('User', userSchema);

export default User;

