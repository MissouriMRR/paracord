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
  completedBy: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  onCampus: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  airframe: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  registrationNumber: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  purpose: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  airspaceNotified: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startTime: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  PIC: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  UAP: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  GSO: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  VOs: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weather: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  terrain: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equipment: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  populatedArea: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  potentialHazards: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  leadApprovalSignature: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  PICApprovalSignature: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  PICRegistrationNumber: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  frame: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  motors: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  propellors: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  batteries: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sensors: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  payload: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  groundStation: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rangeFinder: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  opticalFlow: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  onBoardComputer: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  flightBoard: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  voltageAlarms: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  failSafe: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verifiedFlightPlan: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pilotInPosition: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  VOsInPosition: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  groundStationReady: Boolean;
}
