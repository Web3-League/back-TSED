import { Injectable } from "@tsed/di";
import { IVeterinaire } from "./VeterinaireModel";
import { VeterinaireModel } from "./VeterinaireModel";
import { UsersModel } from "../users/UsersModel";
import { RaceModel } from "../race/RaceModel";
import mongoose from "mongoose";


@Injectable()
export class VeterinaireService {
    constructor() { }

    async getRaces(): Promise<{ id: String; race: string }[]> {
        const animals = await VeterinaireModel.find();
        return animals.map((animal) => ({ id: animal._id, race: animal.race_id }));
    }


    async getRacesByOwner(ownerId: string): Promise<{ id: string; race: string }[]> {
        const animals: IVeterinaire[] = await VeterinaireModel.find({ owners: ownerId });
        if (!animals) {
            throw new Error(`Owner ID not found: ${ownerId}`);
        }
        return animals.map((animal) => ({ id: animal._id.toString(), race: animal.race_id }));
    }

    private isValidUUID(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }

    async getAntiTique(userId: string, animalName: string): Promise<{ id: string; anti_tique: boolean }[]> {
        const animals = await VeterinaireModel.find({ owners: userId, animal_name: animalName });
        const result: { id: string; anti_tique: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_tique === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_tique: animal.anti_tique,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }

    async getAntiVirus(userId: string, animalName: string): Promise<{ id: string; anti_virus: boolean }[]> {
        const animals = await VeterinaireModel.find({ owners: userId, animal_name: animalName });
        const result: { id: string; anti_virus: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_virus === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_virus: animal.anti_virus,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }

    async getTraitement(userId: string, animalName: string): Promise<{ id: string; traitement: string }[]> {
        const animals = await VeterinaireModel.find({ owners: userId, animal_name: animalName });
        const result: { id: string; traitement: string }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.traitement === 'string') {
                result.push({
                    id: animal._id.toString(),
                    traitement: animal.traitement,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }


    async getAntiBacterie(userId: string, animalName: string): Promise<{ id: string; anti_bacterie: boolean }[]> {
        const animals = await VeterinaireModel.find({ owners: userId, animal_name: animalName });
        const result: { id: string; anti_bacterie: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_bacterie === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_bacterie: animal.anti_bacterie,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }

    async getTraitementForAdmin(name: string): Promise<{ id: string; traitement: string }[]> {
        const animals = await VeterinaireModel.find({ animal_name: name });
        const result: { id: string; traitement: string }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.traitement === 'string') {
                result.push({
                    id: animal._id.toString(),
                    traitement: animal.traitement,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }

    async getAntiVirusForAdmin(name: string): Promise<{ id: string; anti_virus: boolean }[]> {
        const animals = await VeterinaireModel.find({ animal_name: name });
        const result: { id: string; anti_virus: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_virus === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_virus: animal.anti_virus,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }

    async getAntiBacterieForAdmin(name: string): Promise<{ id: string; anti_bacterie: boolean }[]> {
        const animals = await VeterinaireModel.find({ animal_name: name });
        const result: { id: string; anti_bacterie: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_bacterie === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_bacterie: animal.anti_bacterie,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }


    async updateTraitement(animal_name: string, data: any) {
        const updatedTraitement = await VeterinaireModel.findOneAndUpdate(
            { animal_name },
            { $set: data },
            { new: true }
        );
        if (!updatedTraitement) {
            throw new Error(`Traitement for animal ${animal_name} not found`);
        }
        return { id: updatedTraitement._id.toString(), traitement: updatedTraitement.traitement };
    }

    async updateAntiBacterie(animalName: string, data: { anti_bacterie: boolean }): Promise<{ id: string; anti_bacterie: boolean }> {
        const updatedAnimal = await VeterinaireModel.findOneAndUpdate({ animal_name: animalName }, data, { new: true });
        if (!updatedAnimal) {
            throw new Error(`Animal with name ${animalName} not found`);
        }
        return { id: updatedAnimal._id.toString(), anti_bacterie: updatedAnimal.anti_bacterie };
    }

    async createTraitement(data: { traitement: string, animal_name: string }): Promise<{ id: string; traitement: string }> {
        const newAnimal = await VeterinaireModel.create(data);
        return { id: newAnimal._id.toString(), traitement: newAnimal.traitement };
    }

    async createAntiBacterie(data: { anti_bacterie: boolean, animal_name: string }): Promise<{ id: string; anti_bacterie: boolean }> {
        const newAnimal = await VeterinaireModel.create(data);
        return { id: newAnimal._id.toString(), anti_bacterie: newAnimal.anti_bacterie };
    }

    async createAntiVirus(data: { anti_virus: boolean, animal_name: string }): Promise<{ id: string; anti_virus: boolean }> {
        const newAnimal = await VeterinaireModel.create(data);
        return { id: newAnimal._id.toString(), anti_virus: newAnimal.anti_virus };
    }

    async updateAntiVirus(animalName: string, data: { anti_virus: boolean }): Promise<{ id: string; anti_virus: boolean }> {
        const updatedAnimal = await VeterinaireModel.findOneAndUpdate({ animal_name: animalName }, data, { new: true });
        if (!updatedAnimal) {
            throw new Error(`Animal with name ${animalName} not found`);
        }
        return { id: updatedAnimal._id.toString(), anti_virus: updatedAnimal.anti_virus };
    }

    async getAntiTiqueForAdmin(animalName: string): Promise<{ id: string; anti_tique: boolean }[]> {
        const animals = await VeterinaireModel.find({ animal_name: animalName });
        const result: { id: string; anti_tique: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_tique === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_tique: animal.anti_tique,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }

    async createAntiTique(data: { anti_tique: boolean, animal_name: string }): Promise<{ id: string; anti_tique: boolean }> {
        const newAnimal = await VeterinaireModel.create(data);
        return { id: newAnimal._id.toString(), anti_tique: newAnimal.anti_tique };
    }

    async updateAntiTique(animalName: string, data: { anti_tique: boolean }): Promise<{ id: string; anti_tique: boolean }> {
        const updatedAnimal = await VeterinaireModel.findOneAndUpdate({ animal_name: animalName }, data, { new: true });
        if (!updatedAnimal) {
            throw new Error(`Animal with name ${animalName} not found`);
        }
        return { id: updatedAnimal._id.toString(), anti_tique: updatedAnimal.anti_tique };
    }

    async getAntiPuce(userId: string, animalName: string): Promise<{ id: string; anti_puce: boolean }[]> {
        const animals = await VeterinaireModel.find({ owners: userId, animal_name: animalName });
        const result: { id: string; anti_puce: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_puce === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_puce: animal.anti_puce,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }


    async getAntiPuceForAdmin(animalName: string): Promise<{ id: string; anti_puce: boolean }[]> {
        const animals = await VeterinaireModel.find({ animal_name: animalName });
        const result: { id: string; anti_puce: boolean }[] = [];
        for (const animal of animals) {
            if (animal && animal._id && typeof animal.anti_puce === 'boolean') {
                result.push({
                    id: animal._id.toString(),
                    anti_puce: animal.anti_puce,
                });
            } else {
                console.error("Invalid animal entry:", animal);
            }
        }
        return result;
    }

    async createAntiPuce(data: { anti_puce: boolean, animal_name: string }): Promise<{ id: string; anti_puce: boolean }> {
        const newAnimal = await VeterinaireModel.create(data);
        return { id: newAnimal._id.toString(), anti_puce: newAnimal.anti_puce };
    }

    async updateAntiPuce(animalName: string, data: { anti_puce: boolean }): Promise<{ id: string; anti_puce: boolean }> {
        const updatedAnimal = await VeterinaireModel.findOneAndUpdate({ animal_name: animalName }, data, { new: true });
        if (!updatedAnimal) {
            throw new Error(`Animal with name ${animalName} not found`);
        }
        return { id: updatedAnimal._id.toString(), anti_puce: updatedAnimal.anti_puce };
    }

    async createAnimalName(createNameDto: CreateNameDto): Promise<{ animal_name: string; owners: string[]; race_id: string }> {
        const { animal_name, owners, race_id } = createNameDto;

        // Log the received input
        console.log('createAnimalName received:', createNameDto);

        // Validate inputs
        if (!owners || owners.length === 0) {
            throw new Error('Owners must be provided');
        }
        if (!animal_name) {
            throw new Error('Name must be provided');
        }
        if (!race_id) {
            throw new Error('Race must be provided');
        }
        if (!this.isValidUUID(race_id) && !mongoose.Types.ObjectId.isValid(race_id)) {
            throw new Error('Invalid race ID');
        }

        // Validate race_id existence in Race collection
        const raceExists = await RaceModel.exists({ _id: race_id });
        if (!raceExists) {
            throw new Error(`Race ID does not exist in the database: ${race_id}`);
        }

        // Validate each owner's ID and check their existence in the User collection
        for (const owner of owners) {
            if (!this.isValidUUID(owner) && !mongoose.Types.ObjectId.isValid(owner)) {
                throw new Error(`Invalid owner ID: ${owner}`);
            }
            const userExists = await UsersModel.exists({ _id: owner });
            if (!userExists) {
                throw new Error(`Owner ID does not exist in the database: ${owner}`);
            }
        }

        // Create the animal object
        const animalToCreate = { animal_name, owners, race_id };

        try {
            // Save the animal object to the database
            const createdAnimal: IVeterinaire = await VeterinaireModel.create(animalToCreate);

            // Return the created animal's details
            return {
                animal_name: createdAnimal.animal_name,
                owners: createdAnimal.owners,
                race_id: createdAnimal.race_id
            };
        } catch (error) {
            console.error('Error in createAnimalName:', error);
            throw new Error('Failed to create animal name');
        }
    }

    async getAnimalNameByRace(race_id: string): Promise<{ animal_name: string; owners: string[] }[]> {
        // Validate race_id
        if (!this.isValidUUID(race_id) && !mongoose.Types.ObjectId.isValid(race_id)) {
            throw new Error('Invalid race ID');
        }

        const animals = await VeterinaireModel.find({ race_id });

        if (!animals || animals.length === 0) {
            return [];
        }

        return animals.map((animal) => ({ animal_name: animal.animal_name, owners: animal.owners }));
    }

    async getAnimalNameByOwnerAndRace(ownerId: string, race_id: string): Promise<{ animal_name: string }[]> {
        // Validate ownerId and race_id
        if (!this.isValidUUID(ownerId) && !mongoose.Types.ObjectId.isValid(ownerId)) {
            throw new Error('Invalid owner ID');
        }
        if (!this.isValidUUID(race_id) && !mongoose.Types.ObjectId.isValid(race_id)) {
            throw new Error('Invalid race ID');
        }

        const animals = await VeterinaireModel.find({ owners: ownerId, race_id: race_id });

        if (!animals || animals.length === 0) {
            return [];
        }

        return animals.map((animal) => ({ animal_name: animal.animal_name }));
    }

    async updateAnimalName(updateNameDto: { id: string; animal_name: string; owners: string[]; race?: string }): Promise<{ animal_name: string; owners: string[]; race?: string }> {
        const { id, animal_name, owners, race } = updateNameDto;
        if (!animal_name) {
            throw new Error('Name must be provided');
        }

        if (!race) {
            throw new Error('Race must be provided');
        }
        // Validate owners as UUIDs and check their existence in the User collection
        for (const owner of owners) {
            if (!this.isValidUUID(owner)) {
                throw new Error(`Invalid owner ID: ${owner}`);
            }

            const userExists = await UsersModel.exists({ _id: owner });
            if (!userExists) {
                throw new Error(`Owner ID does not exist in the database: ${owner}`);
            }
        }

        const updatedAnimal = await VeterinaireModel.findByIdAndUpdate(id, { animal_name, owners, race }, { new: true });

        if (!updatedAnimal) {
            throw new Error('Animal not found');
        }

        return updatedAnimal;
    }

    async deleteTraitement(animalName: string) {
        const deletedAnimal = await VeterinaireModel.findOneAndDelete({ animal_name: animalName });
        if (!deletedAnimal) {
            throw new Error(`Animal with name ${animalName} not found`);
        }
        return deletedAnimal;
    }

}
