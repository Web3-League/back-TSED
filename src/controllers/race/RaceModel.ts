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

});

RaceSchema.pre('save', async function(next) {
  if (!this._id) {
    this._id = crypto.randomUUID();
  }
  next();
});

export const RaceModel = mongoose.model<IRace>("Race", RaceSchema);
