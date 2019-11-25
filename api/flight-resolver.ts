import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository} from "typeorm"
import { Flight } from "./flight"
import { Session } from "./session"

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
		@Arg("id", () => Int) id: number
	): Promise<boolean> {

		await this.flightRepo.delete({
			id: id
		})

		return true
	}

	@Query(() => Flight)
	protected async returnFlightByID(
		@Arg("id", () => Int) id: number
	): Promise<Flight> {

		return this.flightRepo.findOneOrFail({
			id: id
		})
	}

	@Mutation(() => Flight)
	protected async createFlight(
		@Arg("purpose", () => String) purpose: string,
		@Arg("description", () => String) description: string,
		@Arg("sessionid", () => Int) sessionid: number
	): Promise<Flight> {

		let session: Session = await this.sessionRepo.findOneOrFail({
			id: sessionid
		})
		let sessionFlights: Flight[] = await session.flights
		
		let flight: Flight = this.flightRepo.create({
			purpose: purpose,
			description: description,
			outcome: ""
		})
		await flight.save()

		if(sessionFlights) {
			sessionFlights.push(flight)
		} else {
			sessionFlights = [flight]
		}
		
		session.flights = sessionFlights
		await session.save()
		
		return flight.save()
	}

	@Mutation(() => Flight)
	protected async endFlight(
		@Arg("id", () => Int) id: number,
		@Arg("outcome", () => String) outcome: string
	): Promise<Flight> {

		let flight : Flight = await this.flightRepo.findOneOrFail({
			id: id
		})
		flight.outcome = outcome

		return flight.save()
	}
}

