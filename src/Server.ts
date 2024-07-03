import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/ajv";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import * as users from "./controllers/users/index";
import * as auth from "./controllers/auth/index";
import * as veterinaire from "./controllers/veterinaire/index";
import * as race from "./controllers/race/index";
import cors from "cors";
import connectDB from "./config/database";
import { UsersService } from "./controllers/users/UsersService";
import { AuthService } from "./controllers/auth/AuthService";
import bodyParser from "body-parser";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: "127.0.0.1:8083",
  httpsPort: false, 
  disableComponentsScan: true,
  ajv: {
    returnsCoercedValues: true
  },
  mount: {
    "/api": [
      ...Object.values(users),
      ...Object.values(rest),
      ...Object.values(auth),
      ...Object.values(veterinaire),
      ...Object.values(race)
    ]
  },
  middlewares: [
    cors({ origin: "*" }),
    "cookie-parser",
    "compression",
    "method-override",
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
  ],
  views: {
    root: join(__dirname, "../views"),  // Ensure this path points to your views directory
    extensions: {
      ejs: "ejs"
    },
  },
  exclude: [
    "**/*.spec.ts"
  ],
  imports: [
    UsersService,
    AuthService
  ],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  async $beforeInit() {
    await connectDB();
  }

  $afterRoutesInit() {
    this.app.getApp().set("views", join(__dirname, "../views"));
    this.app.getApp().set("view engine", "ejs");
  }
}

