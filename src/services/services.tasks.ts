import { Request, Response } from 'express';
import Tasks from '../models/Tasks';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const user: any = req.user;
        const response = await Tasks.find({ owner: user._id })
        return res.json(response)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        let task = new Tasks()
        const user: any = req.user;
        if (!user) return res.json({ message: "no" })
        task.owner = user._id;
        task.title = title;
        task.description = description;
        await task.save()
        return res.json({ message: "the task have been saved successfully" })
    } catch (error) {
        return res.status(400).json(error)
    }
}