import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    name: string,
    password: string,
    email: string,
    role: string,
    created: Date,
    comparePasswords: (password: string) => Promise<boolean>

}

const user: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    created: { type: Date, default: new Date() }
})

user.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

})

user.methods.comparePasswords = async function (password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    return (match)
}

export default model<IUser>('user', user);