import { Controller } from "@tsed/di";
import { Get, Post } from "@tsed/schema";
import { CreateUserDto } from "../dto/create-user.dto";
import { PathParams } from "@tsed/platform-params";
import { IUser } from "./UsersModel";
import { UsersService } from "./UsersService";
import { BodyParams } from "@tsed/common";


@Controller("/users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@BodyParams() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Get("/:id")
  async findById(@PathParams("id") id: string): Promise<IUser> {
    return this.userService.findById(id);
  }
}

