import { Query, Resolver, Mutation, Args, Arg, Int, FieldResolver, Root } from "type-graphql";
import { Repository, getRepository} from "typeorm";
import { Organization } from "./organization";
import { User } from "./user"

@Resolver(() => Organization)
export class OrganizationResolver {
	public orgRepo: Repository<Organization> = getRepository(Organization); 
    public userRepo: Repository<User> = getRepository(User);

	@Query(() => [Organization])
	protected async organizations(): Promise<Organization[]> {
		return this.orgRepo.find();
	}

	/* //TODO: figure out why this doesnt work
	@FieldResolver()
	users(@Root() org: Organization): Promise<User[]> {
	  return this.userRepo.find({
		cache: 1000,
		where: { orgid : org.id },
	  });
	}
	*/

	@Query(() => [User])
	protected async orgUsers(
		@Arg("orgid", () => Int) orgid: number
	): Promise<User[]> {
		return this.userRepo.find({orgid : orgid});
	}

	@Mutation(() => Organization)
	protected async createOrganization(
        @Arg("name", () => String) name: string 
	): Promise<Organization> {
		const organization = this.orgRepo.create({ name: name });
		return organization.save();
    }
    
	@Mutation(() => Boolean)
	protected async deleteOrganizationByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.orgRepo.delete({
			id: id
		});
		return true;
	}
}