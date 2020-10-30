import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class FlightOp extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  completedBy: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  onCampus: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  airframe: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  registrationNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  purpose: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  airspaceNotified: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  PIC: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  UAP: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  GSO: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  VOs: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weather: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  terrain: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equipment: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  populatedArea: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  potentialHazards: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  leadApprovalSignature: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  PICApprovalSignature: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  PICRegistrationNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  frame: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  motors: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  propellors: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  batteries: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sensors: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  payload: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  groundStation: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rangeFinder: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  opticalFlow: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  onBoardComputer: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  flightBoard: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  voltageAlarms: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  failSafe: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verifiedFlightPlan: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pilotInPosition: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  VOsInPosition: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  groundStationReady: boolean;
}
