import { Injectable } from "@tsed/di";
import { IRace } from "./RaceModel";
import { RaceModel } from "./RaceModel";
import UpdateRaceDto from "../dto/update-race.dto";

@Injectable()
export class RaceService {
    constructor() { }

    async getRaces(): Promise<{ id: string; race: string }[]> {
        const animals = await RaceModel.find();
        return animals.map((animal) => ({ id: animal._id.toString(), race: animal.race }));
    }


    async getRacesByOwner(ownerId: string): Promise<{ id: string; race: string }[]> {
        const animals: IRace[] = await RaceModel.find({ owners: ownerId });
        if (!animals) {
            throw new Error(`Owner ID not found: ${ownerId}`);
        }
        return animals.map((animal) => ({ id: animal._id.toString(), race: animal.race }));
    }


    async createRaces(createRaceDto: CreateRaceDto): Promise<{ race: string; }[]> {
        const { race } = createRaceDto;
        if (!race) {
            throw new Error('Race must be provided');
        }
        const animalToCreate = {
            race
        };
        const createdAnimal: IRace = await RaceModel.create(animalToCreate);
        return [{
            race: createdAnimal.race,
        }];
    }

    async updateRaces(updateRaceDto: UpdateRaceDto): Promise<{ race: string; }[]> {
        const { race_id, race } = updateRaceDto;
        if (!race_id || !race) {
            throw new Error('Id and race must be provided');
        }
        const animalToUpdate = {
            race
        };
        await RaceModel.findByIdAndUpdate(race_id, animalToUpdate);
        return [{
            race
        }];
    }


    private isValidUUID(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }
}
