import { WorkoutSplits } from '../../src/workouts/workout_splits.entity';

import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;

  @OneToMany(
    () => WorkoutSplits,
    (workoutSplits: WorkoutSplits) => workoutSplits.users,
  )
  workoutSplits: WorkoutSplits[];
}
