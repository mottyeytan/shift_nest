import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AssigmentEntity } from "../assigment/assigment.entity";

@Entity('shifts')
export class ShiftEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => AssigmentEntity, assignment => assignment.shift)
    assignment: AssigmentEntity[];

    @Column({nullable: false})
    start_time: string;

    @Column({nullable: false})
    end_time: string;

    @Column({nullable: false})
    location: string;

}