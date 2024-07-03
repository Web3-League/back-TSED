import mongoose, { Schema, Document } from "mongoose";

export interface IUserVeterinaire extends Document {
    user: string;
    veterinaire: string;
}

const UserVeterinaireSchema: Schema = new Schema({
    user: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return mongoose.Types.ObjectId.isValid(v);
            },
            message: (props: any) => `${props.value} is not a valid ObjectId!`
        },
        ref: "User",
    },
    veterinaire: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return mongoose.Types.ObjectId.isValid(v);
            },
            message: (props: any) => `${props.value} is not a valid ObjectId!`
        },
        ref: "Veterinaire",
    }
});

export const UserVeterinaireModel = mongoose.model<IUserVeterinaire>("UserVeterinaire", UserVeterinaireSchema);

