import mongoose, { Schema, Document } from "mongoose";

export interface IVeterinaireRace extends Document {
  race: string;
  veterinaire: string;
}

const VeterinaireRaceSchema: Schema = new Schema({
  race: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: (props:any) => `${props.value} is not a valid ObjectId!`
    },
    ref: "Race"
  },
  veterinaire: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: (props:any) => `${props.value} is not a valid ObjectId!`
    },
    ref: "Veterinaire"
  }
});

export const VeterinaireRaceModel = mongoose.model<IVeterinaireRace>("VeterinaireRace", VeterinaireRaceSchema);

