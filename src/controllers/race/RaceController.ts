import { BodyParams , PathParams} from "@tsed/common";
import {Controller} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import {RaceService} from "./RaceService";

@Controller("/races")
export class RaceController {
  constructor(private readonly RaceService: RaceService) {}

  @Get("/all")
  async getRaces(): Promise<{ id: Number; race: string }[]> {
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
}
