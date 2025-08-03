import { BadRequestException, Injectable } from '@nestjs/common';

import { ShiftEntity } from './shifts.entites';


@Injectable()
export class ShiftsService {
    async createShift(body: ShiftEntity) {
    
    const shiftexists = await ShiftEntity.findOne({ where: { start_time: body.start_time, end_time: body.end_time, location: body.location } });
    if (shiftexists && shiftexists.start_time === body.start_time && shiftexists.end_time === body.end_time && shiftexists.location === body.location) {
        throw new BadRequestException('Shift already exists');
    }
        const shift = new ShiftEntity();
        shift.start_time = body.start_time;
        shift.end_time = body.end_time;
        shift.location = body.location;
        return shift.save();
        
    }


    async updateShift(id: number, body: ShiftEntity) {
        const shift = await ShiftEntity.findOne({ where: { id } });
        if (!shift) {
            throw new BadRequestException('Shift not found');
        }
        shift.start_time = body.start_time ?? shift.start_time;
        shift.end_time = body.end_time ?? shift.end_time;
        shift.location = body.location ?? shift.location;
        return shift.save();
    }

    async deleteShift(id: number) {
        const shift = await ShiftEntity.findOne({ where: { id } });
        if (!shift) {
            throw new BadRequestException('Shift not found');
        }
        return shift.remove();
    }
}
