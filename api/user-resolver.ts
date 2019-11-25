import { Query, Resolver, Mutation, Arg, Int} from "type-graphql"
import { Repository, getRepository} from "typeorm"
import { User } from "./user"
import { Organization } from "./organization"

@Resolver(() => User)
export class UserResolver {
	public orgRepo: Repository<Organization> = getRepository(Organization)
    public userRepo: Repository<User> = getRepository(User)

	@Query(() => [User])
	protected async users(): Promise<User[]> {
		return await this.userRepo.find()
	}

	@Query(() => User)
	protected async returnUserByEmail(
		@Arg("email", () => String) email: string
	): Promise<User> {
		return this.userRepo.findOneOrFail({
			email: email
        })
	}

	@Query(() => User)
	protected async returnUserByID(
		@Arg("id", () => Int) id: number
	): Promise<User> {
		return this.userRepo.findOneOrFail({
			id: id
        })
	}

	@Mutation(() => User)
	protected async createUser(
        @Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string
	): Promise<User> {
		const user : User = this.userRepo.create({
			email: email,
			password: password, 
			organizations: []
		})
		return user.save()
	}

	@Mutation(() => User)
	protected async addUserToOrganization (
		@Arg("userid", () => Int) userid: number,
		@Arg("orgid", () => Int) orgid: number
	): Promise<User> {
		let organization : Organization = await this.orgRepo.findOneOrFail({id: orgid})
		let user : User = await this.userRepo.findOneOrFail({id : userid})
		let userOrgs : Organization[] = await user.organizations
		if(userOrgs) {
			userOrgs.push(organization)
		} else {
			userOrgs = [organization]
		} 
		user.organizations = userOrgs
		return user.save()
	}
	
	@Mutation(() => Boolean)
	protected async deleteUserByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.userRepo.delete({
			id: id
		})
		return true
	}

}