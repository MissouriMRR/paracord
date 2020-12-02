import { Query, Resolver, Mutation, Arg, Int } from "type-graphql";
import { Repository, getRepository } from "typeorm";
import { FlightOp } from "../entities/flight-op";
import { createFolder, deleteFile } from "../file_manager/file_manager";

@Resolver(() => FlightOp)
export class FlightOpResolver {
  public flightOpRepo: Repository<FlightOp> = getRepository(FlightOp);
  @Query(() => [FlightOp])
  protected async flightOps(): Promise<FlightOp[]> {
    return this.flightOpRepo.find();
  }

  @Query(() => FlightOp)
  protected async returnFlightOpByID(
    @Arg("id", () => Int)
    id: number
  ): Promise<FlightOp> {
    return this.flightOpRepo.findOneOrFail({
      id: id,
    });
  }

  @Query(() => [FlightOp])
  protected async getAllFlightOps(): Promise<FlightOp[]> {
    return this.flightOpRepo.find();
  }

  @Mutation(() => FlightOp)
  protected async createFlightOp(
    @Arg("completedBy", () => String)
    completedBy: String,
    @Arg("date", () => String)
    date: String,
    @Arg("location", () => String)
    location: String,
    @Arg("onCampus", () => Boolean)
    onCampus: Boolean,
    @Arg("airframe", () => String)
    airframe: String,
    @Arg("registrationNumber", () => String)
    registrationNumber: String,
    @Arg("purpose", () => String)
    purpose: String,
    @Arg("airspaceNotified", () => String)
    airspaceNotified: String,
    @Arg("startTime", () => String)
    startTime: String,
    @Arg("duration", () => String)
    duration: String,
    @Arg("PIC", () => String)
    PIC: String,
    @Arg("UAP", () => String)
    UAP: String,
    @Arg("GSO", () => String)
    GSO: String,
    @Arg("VOs", () => String)
    VOs: String,
    @Arg("weather", () => String)
    weather: String,
    @Arg("terrain", () => String)
    terrain: String,
    @Arg("equipment", () => String)
    equipment: String,
    @Arg("populatedArea", () => String)
    populatedArea: Boolean,
    @Arg("potentialHazards", () => String)
    potentialHazards: String,
    @Arg("leadApprovalSignature", () => String)
    leadApprovalSignature: String,
    @Arg("PICApprovalSignature", () => String)
    PICApprovalSignature: String,
    @Arg("PICApprovalSignature", () => String)
    PICRegistrationNumber: String,
    @Arg("frame", () => Boolean)
    frame: Boolean,
    @Arg("motors", () => Boolean)
    motors: Boolean,
    @Arg("propellors", () => Boolean)
    propellors: Boolean,
    @Arg("batteries", () => Boolean)
    batteries: Boolean,
    @Arg("sensors", () => Boolean)
    sensors: Boolean,
    @Arg("payload", () => Boolean)
    payload: Boolean,
    @Arg("groundStation", () => Boolean)
    groundStation: Boolean,
    @Arg("rangeFinder", () => Boolean)
    rangeFinder: Boolean,
    @Arg("opticalFlow", () => Boolean)
    opticalFlow: Boolean,
    @Arg("onBoardComputer", () => Boolean)
    onBoardComputer: Boolean,
    @Arg("flightBoard", () => Boolean)
    flightBoard: Boolean,
    @Arg("voltageAlarms", () => Boolean)
    voltageAlarms: Boolean,
    @Arg("failSafe", () => Boolean)
    failSafe: Boolean,
    @Arg("verifiedFlightPlan", () => Boolean)
    verifiedFlightPlan: Boolean,
    @Arg("pilotInPosition", () => Boolean)
    pilotInPosition: Boolean,
    @Arg("VOsInPosition", () => Boolean)
    VOsInPosition: Boolean,
    @Arg("groundStationReady", () => Boolean)
    groundStationReady: Boolean
  ): Promise<FlightOp> {
    let flightOp: FlightOp = this.flightOpRepo.create({
      completedBy: completedBy,
      date: date,
      location: location,
      onCampus: onCampus,
      airframe: airframe,
      registrationNumber: registrationNumber,
      purpose: purpose,
      airspaceNotified: airspaceNotified,
      startTime: startTime,
      duration: duration,
      PIC: PIC,
      UAP: UAP,
      GSO: GSO,
      VOs: VOs,
      weather: weather,
      terrain: terrain,
      equipment: equipment,
      populatedArea: populatedArea,
      potentialHazards: potentialHazards,
      leadApprovalSignature: leadApprovalSignature,
      PICApprovalSignature: PICApprovalSignature,
      PICRegistrationNumber: PICRegistrationNumber,
      frame: frame,
      motors: motors,
      propellors: propellors,
      batteries: batteries,
      sensors: sensors,
      payload: payload,
      groundStation: groundStation,
      rangeFinder: rangeFinder,
      opticalFlow: opticalFlow,
      onBoardComputer: onBoardComputer,
      flightBoard: flightBoard,
      voltageAlarms: voltageAlarms,
      failSafe: failSafe,
      verifiedFlightPlan: verifiedFlightPlan,
      pilotInPosition: pilotInPosition,
      VOsInPosition: VOsInPosition,
      groundStationReady: groundStationReady,
    });
    return flightOp.save();
  }
}
