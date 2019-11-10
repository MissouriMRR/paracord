import { Query, Resolver, Mutation, Args, Arg, Int } from "type-graphql";
import { Repository, getRepository} from "typeorm";
import { Session } from "./session";

@Resolver(() => Session)
export class SessionResolver {
	public sessionRepo: Repository<Session> = getRepository(Session); 

	@Query(() => [Session])
	protected async sessions(): Promise<Session[]> {
		return this.sessionRepo.find();
    }
    
	@Mutation(() => Session)
	protected async createSession(
        @Arg("purpose", () => String) purpose: string,
        @Arg("description", () => String) description: string 
	): Promise<Session> {
		const session = this.sessionRepo.create({
            purpose: purpose,
            description: description
		});
		return session.save();
	}
}