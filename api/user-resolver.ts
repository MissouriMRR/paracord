import { Query, Resolver, Mutation, Args, Arg, Int } from "type-graphql";
import { Repository, getRepository} from "typeorm";
import { User } from "./user";

@Resolver(() => User)
export class UserResolver {
	public repository: Repository<User> = getRepository(User); 

	@Query(() => [User])
	protected async users(): Promise<User[]> {
		return this.repository.find();
	}

	@Query(() => User)
	protected async returnUserByEmail(
		@Arg("email", () => String) email: string
	): Promise<User> {
		return this.repository.findOneOrFail({
			email: email
        });
        //TODO: Handle error where user doesnt exist
	}

	@Query(() => User)
	protected async returnUserByID(
		@Arg("id", () => Int) id: number
	): Promise<User> {
		return this.repository.findOneOrFail({
			id: id
        });
        //TODO
	}

	@Mutation(() => User)
	protected async createUser(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string 
	): Promise<User> {
		const user = this.repository.create({
            email: email,
            password: password
		});
		return user.save();
	}
	
	@Mutation(() => Boolean)
	protected async deleteUserByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.repository.delete({
			id: id
		});
		return true;
	}
}