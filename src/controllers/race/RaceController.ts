import { BodyParams, PathParams } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Get, Post, Put } from "@tsed/schema";
import { RaceService } from "./RaceService";

@Controller("/races")
export class RaceController {
  constructor(private readonly RaceService: RaceService) { }

  @Get("/all")
  async getRaces(): Promise<{ id: string; race: string }[]> {
    return this.RaceService.getRaces();
  }

  @Get("/:ownerId")
  async getRacesByOwner(@PathParams("ownerId") ownerId: string): Promise<{ id: string; race: string }[]> {
    return this.RaceService.getRacesByOwner(ownerId);
  }

  @Post("/race")
  async createRace(
    @BodyParams("race") race: string
  ): Promise<{ race: string; }[]> {
    return this.RaceService.createRaces({
      race
    });
  }

  @Put("/races")
  async updateRace(
    @BodyParams("race") race: string,
    @BodyParams("race_id") race_id: string
  ): Promise<{ race: string; }[]> {
    return this.RaceService.updateRaces({
      race,
      race_id,
    }
    )
  }

}
