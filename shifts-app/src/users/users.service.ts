import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}
    
    async createUser(body) {
        const userExists = await this.userRepository.findOne({ where: { email: body.email } });
        if (userExists) {
            throw new BadRequestException('User already exists');
        }
        
        const userData = {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            role: body.role
        };
        
        const user = this.userRepository.create(userData);
        const savedUser = await this.userRepository.save(user);
        return savedUser;
    }   
}
