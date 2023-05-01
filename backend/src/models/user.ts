import mongoose, {Types} from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser {
    name: string;
    username: string;
    password: string;
    decks?: Types.ObjectId[];
};

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
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    decks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    }]
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password'))
    {
        return next();
    }
    
    this.password =  await bcrypt.hash(this.password, 10);

    next();

})

userSchema.methods.comparePasswords = async function (retrivedPassword: string, userPassword: string)
{
    return await bcrypt.compare(retrivedPassword, userPassword);
}

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__v,
        delete returnedObject.password
    }
});


const User = mongoose.model('User', userSchema);

export default User;

