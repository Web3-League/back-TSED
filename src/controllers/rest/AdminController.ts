import { Controller, Get, Post, Res, Inject, Constant } from "@tsed/common";
import { AdminUserConfig } from "../../config/AdminUserConfig";
import { UsersService } from "../users/UsersService";
import { IUser, UsersModel } from "../users/UsersModel";
import crypto from "crypto";

@Controller("/admin")
export class AdminPageController {
  private adminPageVisible = true;

  @Inject()
  private adminUserConfig: AdminUserConfig;

  @Inject()
  private userService: UsersService;

  @Constant("crypto.salt", "defaultSalt")
  private salt: string;

  @Constant("crypto.iterations", 1000)
  private iterations: number;

  @Constant("crypto.keylen", 64)
  private keylen: number;

  @Constant("crypto.digest", "sha512")
  private digest: string;

  $onInit() {
    this.createAdminUser();
  }

  private async createAdminUser() {
    const adminEmail = "admin@example";
    const user = await this.userService.findByEmail(adminEmail);

    if (!user) {
      try {
        const adminPassword = this.adminUserConfig.getAdminPassword(); 
        if (!adminPassword) {
          throw new Error("Admin password not found or empty.");
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = this.hashPassword(adminPassword, salt);

        const admin = new UsersModel({
          _id: crypto.randomUUID(),
          email: adminEmail,
          password: hashedPassword,
          roles: ["ROLE_ADMIN"], 
          salt: salt
        });

        await this.userService.save(admin, "ROLE_ADMIN");
      } catch (error) {
        console.error("Error creating admin user:", error);
      }
    }
  }

  private hashPassword(password: string, salt: string): string {
    const iterations = this.iterations || 1000;
    const keylen = this.keylen || 64;
    const digest = this.digest || 'sha512';

    return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  }

  @Get("/admin-credentials")
  async showAdminPage(@Res() res: Res): Promise<void> {
    const adminPassword = this.adminUserConfig.getAdminPassword();
    res.render("admin-credentials", { adminPassword });
  }
}


  /* @Post("/admin-credentials/delete")
   deleteAdminPage(@Res() res: Res) {
     this.adminPageVisible = false;
     return res.redirect("/");
   }
     */

