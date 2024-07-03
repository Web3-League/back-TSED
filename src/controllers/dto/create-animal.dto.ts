import { VeterinaireModel } from "../veterinaire/VeterinaireModel";

export class CreateAnimalDto {
    race: string;
    time: Date;
    traitement: string;
    anti_tique : Boolean;
    anti_puce : Boolean;
    anti_virus : Boolean; 
    anti_bacterie : Boolean;
}