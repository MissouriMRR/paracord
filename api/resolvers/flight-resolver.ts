import { Query, Resolver, Mutation, Arg, Int } from 'type-graphql'
import { Repository, getRepository } from 'typeorm'
import { Flight } from '../entities/flight'
import { Session } from '../entities/session'

@Resolver(() => Flight)
export class FlightResolver {
    public flightRepo: Repository<Flight> = getRepository(Flight)
    public sessionRepo: Repository<Session> = getRepository(Session)

    @Query(() => [Flight])
    protected async flights(): Promise<Flight[]> {
        return this.flightRepo.find()
    }

    @Mutation(() => Boolean)
    protected async deleteFlightByID(
        @Arg('id', () => Int)
        id: number
    ): Promise<boolean> {
        await this.flightRepo.delete({
            id: id,
        })

        return true
    }

    @Query(() => Flight)
    protected async returnFlightByID(
        @Arg('id', () => Int)
        id: number
    ): Promise<Flight> {
        return this.flightRepo.findOneOrFail({
            id: id,
        })
    }

    @Mutation(() => Flight)
    protected async createFlight(
        @Arg('purpose', () => String)
        purpose: string
    ): Promise<Flight> {
        let flight: Flight = this.flightRepo.create({
            purpose: purpose,
        })
        return flight.save()
    }

    @Mutation(() => Flight)
    protected async addFlightDescription(
        @Arg('id', () => Int)
        id: number,
        @Arg('description', () => String)
        description: string
    ): Promise<Flight> {
        let flight: Flight = await this.flightRepo.findOneOrFail({
            id: id,
        })
        flight.description = description
        return flight.save()
    }

    @Mutation(() => Flight)
    protected async addFlightOutcome(
        @Arg('id', () => Int)
        id: number,
        @Arg('outcome', () => String)
        outcome: string
    ): Promise<Flight> {
        let flight: Flight = await this.flightRepo.findOneOrFail({
            id: id,
        })
        flight.outcome = outcome

        return flight.save()
    }

    @Mutation(() => Flight)
    protected async addFlightSession(
        @Arg('flightid', () => Int)
        flightid: number,
        @Arg('sessionid', () => Int)
        sessionid: number
    ): Promise<Flight> {
        let flight: Flight = await this.flightRepo.findOneOrFail({
            id: flightid,
        })
        let session: Session = await this.sessionRepo.findOneOrFail({
            id: sessionid,
        })
        flight.session = session
        return flight.save()
    }
}
