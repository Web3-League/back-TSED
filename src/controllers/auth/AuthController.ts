import { Controller } from "@tsed/di";
import { Post } from "@tsed/schema";
import { AuthService } from "../auth/AuthService";
import { BodyParams, Res } from "@tsed/common";
import { Response } from "express";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async register(@BodyParams() body: any, @Res() res: Response) {
    console.log('Register route called');
    console.log('Received data:', body);

    const { email, password } = body;
    try {

        const result = await this.authService.register({ email, password, roles:"ROLE_USER" });
        console.log('Registration successful, result:', result);
        return res.status(201).json({
          message: 'Registration successful',
          token: result.token,
          user: { id: result.user._id, email: result.user.email, roles: result.user.roles },
        });
    } catch (error) {
      console.error('Error during registration:', error.message);
      return res.status(400).json({ message: 'Registration failed', error: error.message });
    }
  }


  @Post('/login')
  async login(@BodyParams() body: { email: string; password: string; roles: string[] }, @Res() res: Response) {
    console.log('Login route called');
    console.log('Received data:', body);

    try {
      const result = await this.authService.login(body);
      console.log('Login successful, result:', result);
      return res.status(200).json({
        message: 'Login successful',
        token: result.token,
        user: { id: result.user._id, email: result.user.email, roles: result.user.roles },
      });
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(400).json({ message: 'Login failed', error: error.message });
    }
  }

}

