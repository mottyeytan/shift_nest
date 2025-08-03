import { Injectable, ForbiddenException } from '@nestjs/common';
import { AssigmentEntity } from './assigment.entity';
import { UserEntity, UserRole } from '../users/users.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AssigmentService {
    constructor(
        @InjectRepository(AssigmentEntity)
        private assigmentRepository: Repository<AssigmentEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async getMyAssignments(userId: number) {
        return this.assigmentRepository.find({
            where: { assignedTo: { id: userId } },
            relations: ['assignedTo', 'shift']
        });
    }


    async getAllAssignments() {
        return this.assigmentRepository.find({
            relations: ['assignedTo', 'shift']
        });
    }

    async createAssignment(createDto: {
        assignedTo: { id: number };
        shift?: { id: number };
    }) {

       const assignmentExists = await this.assigmentRepository.findOne({ where: { assignedTo: { id: createDto.assignedTo.id }, shift: { id: createDto.shift?.id } } });
       if (assignmentExists && assignmentExists.assignedTo.id === createDto.assignedTo.id && assignmentExists.shift?.id === createDto.shift?.id) {
        console.log('Assignment already exists');
       }

        const assignment = await this.assigmentRepository.save(createDto);
        
        
        return this.assigmentRepository.findOne({
            where: { id: assignment.id },
            relations: ['assignedTo', 'shift']
        });
    }

}