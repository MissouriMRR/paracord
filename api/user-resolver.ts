import { Query, Resolver, Mutation, Args, Arg, Int, ID } from "type-graphql";
import { Repository, getRepository} from "typeorm";
import { User } from "./user";
import { Organization } from "./organization";

@Resolver(() => User)
export class UserResolver {
	public orgRepo: Repository<Organization> = getRepository(Organization); 
    public userRepo: Repository<User> = getRepository(User);

	@Query(() => [User])
	protected async users(): Promise<User[]> {
		return this.userRepo.find();
	}

	@Query(() => User)
	protected async returnUserByEmail(
		@Arg("email", () => String) email: string
	): Promise<User> {
		return this.userRepo.findOneOrFail({
			email: email
        });
        //TODO: Handle error where user doesnt exist
	}

	@Query(() => User)
	protected async returnUserByID(
		@Arg("id", () => Int) id: number
	): Promise<User> {
		return this.userRepo.findOneOrFail({
			id: id
        });
        //TODO Handle error where user doesnt exist
	}

	@Mutation(() => User)
	protected async createUser(
        @Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Arg("orgid", () => ID) orgid: number
	): Promise<User> {
		const org = this.orgRepo.find({ id: orgid })[0];
		const user = this.userRepo.create({
            email: email,
			password: password,
			organization: org,
			orgid: orgid
		});
		return user.save();
	}
	
	@Mutation(() => Boolean)
	protected async deleteUserByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.userRepo.delete({
			id: id
		});
		return true;
	}
}