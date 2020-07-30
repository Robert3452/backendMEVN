import { Document, Schema, model } from 'mongoose';
import { IUser } from './User';
export interface ITask extends Document {
    title: string,
    description: string,
    created: Date,
    owner: IUser['_id'],
    sharedWith: [IUser['_id']],

}

const task: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: new Date() },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    sharedWith: { type: [Schema.Types.ObjectId], ref: "user" }
});

export default model<ITask>('task', task)

