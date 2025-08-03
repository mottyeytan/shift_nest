import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entities';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() body: {
        name: string;
        email: string;
        password: string;
        role: 'soldier' | 'commander';
    }) {
        try {
            const user = await this.usersService.createUser(body);
            return {
                message: 'User created successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        } catch (error) {
            return {
                message: 'User creation failed',
                error: error.message
            }
        }
    }}
