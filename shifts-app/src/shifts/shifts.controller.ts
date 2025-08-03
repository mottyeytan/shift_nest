import { Body, Controller, Post, Put, Param, UseGuards, Delete } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftEntity } from './shifts.entites';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/users.entities';

@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) {}

    @Post()
    @Roles(UserRole.COMMANDER)
    async createShift(@Body() body: ShiftEntity) {
       
        try {
            return await this.shiftsService.createShift(body);
        } catch (error) {
            return {
                message: 'Shift creation failed',
                error: error.message
            }
        }
    }

    @Roles(UserRole.COMMANDER)
    @Put(":id")
    async updateShift(@Param("id") id: number, @Body() body: ShiftEntity) {
        return await this.shiftsService.updateShift(id, body);
    }

    @Roles(UserRole.COMMANDER)
    @Delete(":id")
    async deleteShift(@Param("id") id: number) {
        return await this.shiftsService.deleteShift(id);
    }


}
