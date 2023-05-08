import mongoose, {Schema, Types, Document} from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser {
    name: string;
    username: string;
    password: string;
    decks?: Types.ObjectId[];
};

export interface IUserDocument extends IUser, Document {
    comparePasswords: (retrivedPassword: string, userPassword: string) => Promise<Boolean>
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Your name must be more than 2 letters long'],
    },
    username:{
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Your password must be at least 5 characters or longer'],
    },
    decks: [{
        type: Schema.Types.ObjectId,
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

userSchema.methods.comparePasswords = async function (retrivedPassword: string, userPassword: string): Promise<Boolean>
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


const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;

