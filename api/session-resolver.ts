import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository} from "typeorm"
import { Session } from "./session"

@Resolver(() => Session)
export class SessionResolver {
	public sessionRepo: Repository<Session> = getRepository(Session)

	@Query(() => [Session])
	protected async sessions(): Promise<Session[]> {
		return this.sessionRepo.find()
    }
    
	@Mutation(() => Session)
	protected async createSession(
		@Arg("purpose", () => String) purpose: string,
		@Arg("location", () => String) location: string,
		@Arg("terrain", () => String) terrain: string,
		@Arg("weather", () => String) weather: string,
        @Arg("description", () => String) description: string
	): Promise<Session> {
		const session = this.sessionRepo.create({
			purpose: purpose,
			location: location,
			terrain: terrain,
			weather: weather, 
			description: description,
			outcome: ""
		})
		return session.save()
	}

	@Mutation(() => Session)
	protected async endSession(
		@Arg("id", () => Int) id: number,
		@Arg("outcome", () => String) outcome: string
	): Promise<Session> {
		let session : Session = await this.sessionRepo.findOneOrFail({
			id: id
		})
		session.outcome = outcome
		return session.save()
	}

	@Mutation(() => Boolean)
	protected async deleteSessionByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.sessionRepo.delete({
			id: id
		})
		return true
	}

	@Query(() => Session)
	protected async returnSessionByID(
		@Arg("id", () => Int) id: number
	): Promise<Session> {
		return this.sessionRepo.findOneOrFail({
			id: id
        })
	}
}