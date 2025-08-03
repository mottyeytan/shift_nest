import { Module } from '@nestjs/common';
import { AssigmentController } from './assigment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssigmentEntity } from './assigment.entity';
import { AssigmentService } from './assigment.service';
import { UserEntity } from '../users/users.entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssigmentEntity, UserEntity]),
    AuthModule
  ],
  controllers: [AssigmentController],
  providers: [AssigmentService],
  exports: [AssigmentService]
})
export class AssigmentModule {}
