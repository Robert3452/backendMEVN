import { Request, Response } from 'express';
import User from '../models/User';
import config from '../config';
import jwt from 'jsonwebtoken';

export const profile = async (req: Request, res: Response) => {
    try {
        const user: any = req.user;
        console.log(user)
        if (!user) throw { message: "User not found" }
        return res.json(user)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        let user = new User();
        const { email, name, password } = req.body;
        if (!email || !name || !password) throw "complete the fields"
        user.email = email;
        user.password = password;
        user.name = name
        await user.save()
        return res.json({ message: "user created" })

    } catch (error) {
        return res.status(400).json({ message: error })
    }

}

function createToken(user: any) {
    return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400//un día
    })
}

export const signin = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) throw "user does not exist"
        const match: boolean = await user.comparePasswords(password);
        if (!match) throw "password mismatch, please try again"

        //SIGN A TOKEN
        const token = createToken(user)

        return res.header('token', token).json({ message: "loged in!", token })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}