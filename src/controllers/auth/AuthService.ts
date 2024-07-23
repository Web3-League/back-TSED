import { Injectable } from "@tsed/di";
import jwt from "jsonwebtoken";
import { UsersService } from "../users/UsersService";
import { IUser } from "../users/UsersModel";
import { LoginDto } from "../dto/login.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  private readonly jwtSecret: string = process.env.JWT_SECRET || "a167c44c7851a84acb1bd5dd032bb5e88ef81fa3989c0e65cad73b13e6bbeeb9";

  constructor(private usersService: UsersService) { }

  async register(createUserDto: { email: string; password: string; roles: string }, response: Response): Promise<{ token: string, user: IUser }> {
    try {
      console.log('AuthService register called with:', createUserDto);
      const user = await this.usersService.create(createUserDto);
      // Assign roles from the DTO
      user.roles = createUserDto.roles;
      const token = this.generateToken(user);
      console.log('AuthService register token:', token);
      this.setTokenCookie(response, token);
      return { token, user };
    } catch (error) {
      console.error('Error in AuthService register:', error.message);
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async login(createUserDto: LoginDto, response: Response): Promise<{ token: string, user: IUser }> {
    try {
      const { email, password } = createUserDto;
      console.log('AuthService login called with:', createUserDto);

      const user = await this.usersService.validateUser(email, password);
      if (!user) {
        console.error("Invalid email or password for user:", email);
        throw new Error("Invalid email or password");
      }

      const token = this.generateToken(user);
      this.setTokenCookie(response, token);
      return { token, user };
    } catch (error) {
      console.error('Error in AuthService login:', error.message);
      throw new Error('Login failed: ' + error.message);
    }
  }

  private generateToken(user: IUser): string {
    const token = jwt.sign(
      { email: user.email, id: user._id, roles: user.roles },
      this.jwtSecret,
      { expiresIn: '1D' }
    );
    return token;
  }

  private setTokenCookie(response: Response, token: string): void {
    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      console.error('Error in AuthService verifyToken:', error.message);
      throw new Error("Invalid token");
    }
  }

  async validateUserById(userId: string): Promise<IUser> {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error('Error in AuthService validateUserById:', error.message);
      throw new Error('User validation failed');
    }
  }
}
