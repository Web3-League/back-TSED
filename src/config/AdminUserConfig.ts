import { Configuration, Inject } from "@tsed/di";
import * as dotenv from 'dotenv';
import * as path from 'path'; // Ensure you have imported 'path' for correct file path resolution

// Load .env file explicitly
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Adjust the path as necessary

@Configuration()
export class AdminUserConfig {
  @Inject()
  private configuration: Configuration;

  getAdminPassword(): string {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("Admin password not found or empty.");
    }
    return adminPassword;
  }
}



