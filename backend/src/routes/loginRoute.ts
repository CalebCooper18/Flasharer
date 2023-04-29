import { Router } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
    const {name, username, password} = req.body;

    if(!name || !username || !password)
    {
        res.status(400).send('Missing credinitals');
    }

    let user = await User.findOne({username});

    if(user)
    {
        res.status(400).json({error: 'This username as already been taken please use another'});
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    user = new User({
        name,
        username,
        hashPassword
    });

    const newUser = await user.save();


    res.status(200).json(newUser);
})







export default loginRouter;