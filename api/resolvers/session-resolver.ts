import { Arg, Int, Mutation, Query, Resolver } from "type-graphql"
import { getRepository, Repository } from "typeorm"
import { Session } from "../entities/session"

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
		@Arg("description", () => String) description: string
	): Promise<Session> {
		const session = this.sessionRepo.create({
			purpose: purpose,
			description: description
		})
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
}