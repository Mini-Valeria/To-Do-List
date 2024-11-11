import { Schema, model} from "mongoose"

interface IUser{
    name: string,
    email: string,
    password: string,
    rol: string
}

const UserSchema = new Schema<IUser>({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    }
}, { timestamps:true });

export const UserModel = model<IUser>('users', UserSchema);