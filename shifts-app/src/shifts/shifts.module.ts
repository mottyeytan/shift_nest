import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftEntity } from './shifts.entites';
import { ShiftsController } from './shifts.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftEntity]), AuthModule],
  providers: [ShiftsService],
  controllers: [ShiftsController]
})
export class ShiftsModule {}
