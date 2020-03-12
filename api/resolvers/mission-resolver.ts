import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { Mission } from "../entities/mission"
import { Session } from "../entities/session"

@Resolver(() => Mission)
export class MissionResolver {
    public missionRepo: Repository<Mission> = getRepository(Mission)
    public sessionRepo: Repository<Session> = getRepository(Session)

    @Query(() => [Mission])
    protected async missions(): Promise<Mission[]> {
        return this.missionRepo.find()
    }

    @Mutation(() => Boolean)
    protected async deleteMissionByID(
        @Arg("id", () => Int)
        id: number,
    ): Promise<boolean> {
        await this.missionRepo.delete({
            id: id,
        })

        return true
    }

    @Query(() => Mission)
    protected async returnMissionByID(
        @Arg("id", () => Int)
        id: number,
    ): Promise<Mission> {
        return this.missionRepo.findOneOrFail({
            id: id,
        })
    }

    @Mutation(() => Mission)
    protected async createMission(
        @Arg("purpose", () => String)
        purpose: string,
    ): Promise<Mission> {
        let mission: Mission = this.missionRepo.create({
            purpose: purpose,
        })
        return mission.save()
    }

    @Mutation(() => Mission)
    protected async addMissionDescription(
        @Arg("id", () => Int)
        id: number,
        @Arg("description", () => String)
        description: string,
    ): Promise<Mission> {
        let mission: Mission = await this.missionRepo.findOneOrFail({
            id: id,
        })
        mission.description = description
        return mission.save()
    }

    @Mutation(() => Mission)
    protected async addMissionOutcome(
        @Arg("id", () => Int)
        id: number,
        @Arg("outcome", () => String)
        outcome: string,
    ): Promise<Mission> {
        let mission: Mission = await this.missionRepo.findOneOrFail({
            id: id,
        })
        mission.outcome = outcome

        return mission.save()
    }

    @Mutation(() => Mission)
    protected async addMissionSession(
        @Arg("missionid", () => Int)
        missionid: number,
        @Arg("sessionid", () => Int)
        sessionid: number,
    ): Promise<Mission> {
        let mission: Mission = await this.missionRepo.findOneOrFail({
            id: missionid,
        })
        let session: Session = await this.sessionRepo.findOneOrFail({
            id: sessionid,
        })
        mission.session = session
        return mission.save()
    }
}
