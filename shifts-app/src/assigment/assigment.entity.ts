import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { UserEntity } from '../users/users.entities';
import { ShiftEntity } from '../shifts/shifts.entites';

@Entity('assignment')
export class AssigmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'assigned_to_id' })
    assignedTo: UserEntity;

    @ManyToOne(() => ShiftEntity, { nullable: true })
    @JoinColumn({ name: 'shift_id' })
    shift: ShiftEntity;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}