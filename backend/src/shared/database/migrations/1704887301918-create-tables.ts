import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1704887301918 implements MigrationInterface {
  name = 'Migration1704887301918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sessions" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sessions_id" SERIAL NOT NULL, "set" integer NOT NULL, "weight" integer NOT NULL, "reps" integer NOT NULL, "userId" integer, "exercisesId" integer, "workoutsLogId" integer, CONSTRAINT "PK_a60c3d292dd98956f99dcd1fece" PRIMARY KEY ("sessions_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercises" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "exercises_id" SERIAL NOT NULL, "exercise_name" character varying(300) NOT NULL, "goal_sets" integer NOT NULL, "goal_reps" integer NOT NULL, "userId" integer, "workoutsId" integer, CONSTRAINT "PK_9686b3c3955752ddc6aa0727be2" PRIMARY KEY ("exercises_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workouts" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workouts_id" SERIAL NOT NULL, "workout_name" character varying(300) NOT NULL, "programsId" integer, "userId" integer, CONSTRAINT "PK_17897605e099d2b68e91c753a0f" PRIMARY KEY ("workouts_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "programs" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "programs_id" SERIAL NOT NULL, "programs_name" character varying(300) NOT NULL, "days" integer NOT NULL, "userId" integer, CONSTRAINT "PK_aaa6b0b3eaa95ebfcf7fe5a42f7" PRIMARY KEY ("programs_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "password" character varying(300) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workoutsLog" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workouts_log_id" SERIAL NOT NULL, "week" integer NOT NULL, "workoutsId" integer, "userId" integer, CONSTRAINT "PK_d72f0e9afc49c340df2abd05685" PRIMARY KEY ("workouts_log_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_51efb664ec9ffb8d0e89bef2c2f" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("exercises_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_bae412db089bd919b4f9bd8b1ee" FOREIGN KEY ("workoutsLogId") REFERENCES "workoutsLog"("workouts_log_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_6e37f37f422796d689a7b3952cf" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_2ff63384d975d05b621c11ae74a" FOREIGN KEY ("workoutsId") REFERENCES "workouts"("workouts_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_62aa8556e59bbc5ba63e2c08c6a" FOREIGN KEY ("programsId") REFERENCES "programs"("programs_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workoutsLog" ADD CONSTRAINT "FK_e0aa31bfbf88a19b0257b9d50a1" FOREIGN KEY ("workoutsId") REFERENCES "workouts"("workouts_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workoutsLog" ADD CONSTRAINT "FK_3b5f6d9fb5f32da80556fffb1be" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workoutsLog" DROP CONSTRAINT "FK_3b5f6d9fb5f32da80556fffb1be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workoutsLog" DROP CONSTRAINT "FK_e0aa31bfbf88a19b0257b9d50a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" DROP CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_62aa8556e59bbc5ba63e2c08c6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_2ff63384d975d05b621c11ae74a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_6e37f37f422796d689a7b3952cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_bae412db089bd919b4f9bd8b1ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_51efb664ec9ffb8d0e89bef2c2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`,
    );
    await queryRunner.query(`DROP TABLE "workoutsLog"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "programs"`);
    await queryRunner.query(`DROP TABLE "workouts"`);
    await queryRunner.query(`DROP TABLE "exercises"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
  }
}
