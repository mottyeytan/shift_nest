import { MinLength, IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from 'typeorm';
import { AssigmentEntity } from '../assigment/assigment.entity';

export enum UserRole {
    SOLDIER = 'soldier',
    COMMANDER = 'commander'
}

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => AssigmentEntity, assignment => assignment.assignedTo)
    assignment: AssigmentEntity[];

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    @IsEmail()
    email: string;

    @Column({ nullable: false })
    @MinLength(4)
    
    password: string;
    
    @Column({ 
        type: 'enum', 
        enum: UserRole, 
        default: UserRole.SOLDIER 
    })
    role: UserRole;
}