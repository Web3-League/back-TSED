import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

export interface IRace extends Document {
  _id: string;
  race: string;
  veterinaire_id: string;
}

const RaceSchema: Schema = new Schema({
  _id: { type: String, required: true, default: () => crypto.randomUUID() },
  race: { type: String, required: true },
  veterinaire_id: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: (props: any) => `${props.value} is not a valid ObjectId!`
    },
    ref: "Veterinaire",
  }
});

RaceSchema.pre('save', async function(next) {
  if (!this._id) {
    this._id = crypto.randomUUID();
  }
  next();
});

export const RaceModel = mongoose.model<IRace>("Race", RaceSchema);
