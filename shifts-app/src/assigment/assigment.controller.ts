import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AssigmentService } from './assigment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/users.entities';
import { JwtService } from '@nestjs/jwt';

@Controller('assigment')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssigmentController {
    constructor(
        private readonly assigmentService: AssigmentService,
        private readonly jwtService: JwtService
    ) {}

    @Get('my-assignments')
    @Roles(UserRole.SOLDIER)
    async getMyAssignments(@Request() req) {
        return this.assigmentService.getMyAssignments(req.user.userId);
    }

    @Get('all')
    @Roles(UserRole.COMMANDER)
    async getAllAssignments() {
        return this.assigmentService.getAllAssignments();
    }

    @Post("create-assignment")
    @Roles(UserRole.COMMANDER)
    async createAssignment(@Body() createDto: {
        assigned_to_id: number;
        shift_id?: number;
    }, @Request() req) {
        const assignmentData = {
            assignedTo: { id: createDto.assigned_to_id },
            shift: createDto.shift_id ? { id: createDto.shift_id } : undefined,
            status: 'pending'
        };
        return this.assigmentService.createAssignment(assignmentData);
    }

}