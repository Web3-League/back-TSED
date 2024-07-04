import { Controller } from "@tsed/di";
import { Post, Get, Put, Delete, Path } from "@tsed/schema";
import { BodyParams, PathParams, QueryParams } from "@tsed/common";
import { VeterinaireService } from "./VeterinaireService";
import { get } from "config";

interface Animal {
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


@Controller("/veterinaire")
export class VeterinaireController {
    constructor(private veterinaireService: VeterinaireService) { }

    /*{
    @Get("/races")
    async getRaces(): Promise<{ id: Number; race: string }[]> {
      return this.veterinaireService.getRaces();
    }
  
    @Get("/races/:ownerId")
    async getRacesByOwner(@PathParams("ownerId") ownerId: string): Promise<{ id: string; race: string }[]> {
      return this.veterinaireService.getRacesByOwner(ownerId);
    }
  
  
    @Post("/races")
    async createRace(
      @BodyParams("owners") owners: string[],
      @BodyParams("race") race: string
    ): Promise<{ race: string; owners: string[] }[]> {
      return this.veterinaireService.createRaces({
        race, owners,
      });
    }
  }*/

    @Get("/antitiques/:userId/:animalName")
    async getAntiTiques(
        @PathParams("userId") userId: string,
        @PathParams("animalName") animalName: string
    ): Promise<{ id: string; anti_tique: boolean }[]> {
        return this.veterinaireService.getAntiTique(userId, animalName);
    }




    @Get("/antibacteries/:userId/:animalName")
    async getAntiBacteries(
        @PathParams("userId") userId: string,
        @PathParams("animalName") animalName: string
    ): Promise<{ id: string; anti_bacterie: boolean }[]> {
        return this.veterinaireService.getAntiBacterie(userId, animalName);
    }

    @Get("/Admin-antibacteries")
    async getAdminAntiBacteries(@QueryParams("name") name: string): Promise<{ id: string; anti_bacterie: boolean }[]> {
        return this.veterinaireService.getAntiBacterieForAdmin(name);
    }



    @Post("/antitiques")
    async createAntiTique(@BodyParams() data: { anti_tique: boolean, animal_name: string }): Promise<{ id: string; anti_tique: boolean }> {
        return this.veterinaireService.createAntiTique(data);
    }

    @Post("/antibacteries")
    async createAntiBacterie(@BodyParams() data: { anti_bacterie: boolean, animal_name: string }): Promise<{ id: string; anti_bacterie: boolean }> {
        return this.veterinaireService.createAntiBacterie(data);
    }

    @Put("/antibacteries/:animalName")
    async updateAntiBacterie(
        @PathParams("animalName") animalName: string,
        @BodyParams() data: { anti_bacterie: boolean }
    ): Promise<{ id: string; anti_bacterie: boolean }> {
        return this.veterinaireService.updateAntiBacterie(animalName, data);
    }


    @Put("/antitiques/:animalName")
    async updateAntiTique(
        @PathParams("animalName") animalName: string,
        @BodyParams() data: { anti_tique: boolean }
    ): Promise<{ id: string; anti_tique: boolean }> {
        return this.veterinaireService.updateAntiTique(animalName, data);
    }


    @Post("/antipuces")
    async createAntiPuce(@BodyParams() data: { anti_puce: boolean, animal_name: string }): Promise<{ id: string; anti_puce: boolean }> {
        return this.veterinaireService.createAntiPuce(data);
    }

    @Get("/admin-antivirus")
    async getAdminAntiVirus(@QueryParams("name") name: string): Promise<{ id: string; anti_virus: boolean }[]> {
        return this.veterinaireService.getAntiVirusForAdmin(name);
    }

    @Get("/antivirus/:userId/:animalName")
    async getAntiPuces(
        @PathParams("userId") userId: string,
        @PathParams("animalName") animalName: string
    ): Promise<{ id: string; anti_puce: boolean }[]> {
        return this.veterinaireService.getAntiPuce(userId, animalName);
    }

    @Post("/antivirus")
    async createAntiVirus(@BodyParams() data: { anti_virus: boolean, animal_name: string }): Promise<{ id: string; anti_virus: boolean }> {
        return this.veterinaireService.createAntiVirus(data);
    }

    @Put("/antivirus/:animalName")
    async updateAntiVirus(
        @PathParams("animalName") animalName: string,
        @BodyParams() data: { anti_virus: boolean }
    ): Promise<{ id: string; anti_virus: boolean }> {
        return this.veterinaireService.updateAntiVirus(animalName, data);
    }

    @Put("/antipuces/:animalName")
    async updateAntiPuce(
        @PathParams("animalName") animalName: string,
        @BodyParams() data: { anti_puce: boolean }
    ): Promise<{ id: string; anti_puce: boolean }> {
        return this.veterinaireService.updateAntiPuce(animalName, data);
    }

    @Put("/traitements/:animalName")
    async updateTraitement(@PathParams("animalName") animalName: string, @BodyParams() body: any) {
        return this.veterinaireService.updateTraitement(animalName, body);
    }

    @Delete("/traitements/:animalName")
    async deleteTraitement(@PathParams("animalName") animalName: string) {
        return this.veterinaireService.deleteTraitement(animalName);
    }


    @Get("/antipuce/:userId/:animalName")
    async getAntiPuce(
        @PathParams("userId") userId: string,
        @PathParams("animalName") animalName: string
    ): Promise<{ id: string; anti_puce: boolean }[]> {
        return this.veterinaireService.getAntiPuce(userId, animalName);
    }

    @Get("/Admin-antipuces/:animalName")
    async getAdminAntiPuces(@PathParams("animalName") animalName: string): Promise<{ id: string; anti_puce: boolean }[]> {
        return this.veterinaireService.getAntiPucesForAdmin(animalName);
    }

    @Get("/animalname/:ownerId/:race_id")
    async getAnimalNameByOwnerAndRace(
        @PathParams("ownerId") ownerId: string,
        @PathParams("race_id") race_id: string
    ): Promise<{ animal_name: string }[]> {
        return this.veterinaireService.getAnimalNameByOwnerAndRace(ownerId, race_id);
    }

    @Get("/allanimalname/:race_id")
    async getAnimalNameByRace(
        @PathParams("race_id") race_id: string
    ): Promise<{ animal_name: string; owners: string[] }[]> {
        return this.veterinaireService.getAnimalNameByRace(race_id);
    }

    @Post("/animalname")
    async createAnimalName(
        @BodyParams() createNameDto: CreateNameDto
    ): Promise<{ animal_name: string; owners: string[]; race_id: string }> {
        return this.veterinaireService.createAnimalName(createNameDto);
    }

    @Put("/animalname/:id")
    async updateAnimalName(
        @PathParams("id") id: string,
        @BodyParams("animal_name") animal_name: string,
        @BodyParams("owners") owners: string[],
        @BodyParams("raceId") race_id: string
    ): Promise<string[]> {
        const updateNameDto = { animal_name, owners, race_id, id };
        const result = await this.veterinaireService.updateAnimalName(updateNameDto);
        if (Array.isArray(result)) {
            return result.map((item: { animal_name: string }) => item.animal_name);
        } else {
            return [];
        }
    }

    @Get("/Admin-traitement/:animalName")
    async getAdminTraitement(@PathParams("animalName") animalName: string ): Promise<{ id: string; traitement: string }[]> {
        return this.veterinaireService.getTraitementForAdmin(animalName);
    }

    @Get("/Admin-antitiques/:animalName")
    async getAdminAntiTiques(@PathParams("animalName") animalName: string): Promise<{ id: string; anti_tique: boolean }[]> {
        return this.veterinaireService.getAntiTiqueForAdmin(animalName);
    }




    @Get("/traitement/:userId/:animalName")
    async getTraitement(
        @PathParams("userId") userId: string,
        @PathParams("animalName") animalName: string
    ): Promise<{ id: string; traitement: string }[]> {
        return this.veterinaireService.getTraitement(userId, animalName);
    }



    @Post("/traitement")
    async createTraitement(@BodyParams() data: { traitement: string, animal_name: string }): Promise<{ id: string; traitement: string }> {
        return this.veterinaireService.createTraitement(data);
    }

}








