import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

export interface IVeterinaire extends Document {
  _id: string;
  race_id: string;
  time: Date;
  traitement: string;
  anti_tique: boolean;
  anti_puce: boolean;
  anti_virus: boolean;
  anti_bacterie: boolean;
  owners: string[];
  animal_name: string;
}

const VeterinaireSchema: Schema = new Schema({
  _id: { type: String, required: true, default: () => crypto.randomUUID() },
  race_id: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return mongoose.Types.ObjectId.isValid(v) || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid ObjectId or UUID!`
    },
    ref: "Race",
    index: false
  },
  time: { type: Date, required: false },
  traitement: { type: String, required: false },
  anti_tique: { type: Boolean, required: false },
  anti_puce: { type: Boolean, required: false },
  anti_virus: { type: Boolean, required: false },
  anti_bacterie: { type: Boolean, required: false },
  owners: [{
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return mongoose.Types.ObjectId.isValid(v) || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid ObjectId or UUID!`
    },
    ref: "User"
  }],
  animal_name: { type: String, required: false }
});

VeterinaireSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = crypto.randomUUID();
  }
  next();
});

export const VeterinaireModel = mongoose.model<IVeterinaire>("Veterinaire", VeterinaireSchema);
