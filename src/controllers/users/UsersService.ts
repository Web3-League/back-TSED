import { Injectable } from "@tsed/di";
import * as crypto from 'crypto';
import { UsersModel, IUser } from './UsersModel';
import { FilterQuery } from 'mongoose';
import { AdminUserConfig } from '../../config/AdminUserConfig';

@Injectable()
export class UsersService {
  constructor(private adminUserConfig: AdminUserConfig) {}
  private users: Map<string, IUser> = new Map();
  async create(createUserDto: { email: string; password: string , roles: string }): Promise<IUser> {
    console.log('UsersService create called with:', createUserDto);

    const { email, password, roles } = createUserDto;
    if (!email || !password) {
      throw new Error('Email and password must be provided');
    }

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Roles:', roles);

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const user = new UsersModel({ email, password: hashedPassword, salt , roles});
    return user.save();
  }

 async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.findByEmail(email);
    if (user) {
      const salt = user.salt;
      console.log('Salt retrieved from user:', salt);
      
      // Log the plain password and salt
      console.log('Plain password:', password);
      console.log('Using salt:', salt);

      const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

      // Log the hashed password
      console.log('Hashed password:', hashedPassword);
      console.log('Stored hashed password:', user.password);

      if (hashedPassword === user.password) {
        console.log('Password matches.');
        return user;
      } else {
        console.log('Password does not match.');
      }
    } else {
      console.log('User not found.');
    }
    return null;
  }


  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UsersModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    
    return user;
  }
  

  async findById(id: string): Promise<IUser> {
    const user = await UsersModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findOneOrFail(filter: FilterQuery<IUser>): Promise<IUser> {
    const user = await UsersModel.findOne(filter).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async save(user: IUser, role: string): Promise<IUser> {
    user.roles = role;
    const newUser = new UsersModel(user);
    return newUser.save();
  }

  validateAdminCredentials(email: string, password: string): boolean {
    const adminPassword = this.adminUserConfig.getAdminPassword();
    if (!adminPassword) {
      throw new Error("Admin password not found or empty.");
    }
    const hashedPassword = crypto.pbkdf2Sync(password, adminPassword, 1000, 64, 'sha512').toString('hex');
    return hashedPassword === adminPassword;
  }
}


