import { Query, Resolver, Mutation, Args, Arg, Int, FieldResolver, Root } from "type-graphql"
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
	protected async createOrganization(
        @Arg("name", () => String) name: string 
	): Promise<Organization> {
		const organization : Organization = this.orgRepo.create({ name: name, users: [] })
		return organization.save()
    }
    
	@Mutation(() => Boolean)
	protected async deleteOrganizationByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.orgRepo.delete({
			id: id
		});
		return true
	}
}