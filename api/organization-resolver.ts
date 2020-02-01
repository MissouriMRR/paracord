import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository, getConnection} from "typeorm"
import { Organization } from "./organization"
import { User } from "./user"

@Resolver(() => Organization)
export class OrganizationResolver {
	public orgRepo: Repository<Organization> = getConnection().getRepository(Organization) 
	public userRepo: Repository<User> = getConnection().getRepository(User)

	@Query(() => [Organization])
	protected async organizations(): Promise<Organization[]> {
		return this.orgRepo.find()
	}

	@Query(() => Int)
	protected async count_users(
		@Arg("id", () => Int) id: number,
	): Promise<number> {
		const org: Organization = await this.orgRepo.findOneOrFail({
			id: id
		})
		const users: User[] = await org.users
		return users.length
	}

	@Mutation(() => Organization)
	protected async changeOrganizationName(
		@Arg("id", () => Int) id: number,
		@Arg("name", () => String) name: string 
	): Promise<Organization> {
		let org : Organization = await this.orgRepo.findOneOrFail({
			id: id
		})
		org.name = name
		return org.save()
	}

	@Mutation(() => Organization)
	protected async createOrganization(
		@Arg("name", () => String) name: string 
	): Promise<Organization> {
		const organization : Organization = this.orgRepo.create({
			name: name,
			users: [] 
		})
		return organization.save()
	}

	@Mutation(() => Boolean)
	protected async deleteOrganizationByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.orgRepo.delete({
			id: id
		})
		return true
	}

}