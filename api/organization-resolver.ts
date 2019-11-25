import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository} from "typeorm"
import { Organization } from "./organization"
import { User } from "./user"

@Resolver(() => Organization)
export class OrganizationResolver {
	public orgRepo: Repository<Organization> = getRepository(Organization) 
	public userRepo: Repository<User> = getRepository(User)

	@Query(() => [Organization])
	protected async organizations(): Promise<Organization[]> {
		return this.orgRepo.find()
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