import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository} from "typeorm"
import { Drone } from "./drone"
import { Organization } from "./organization"

@Resolver(() => Drone)
export class DroneResolver {
	public droneRepo: Repository<Drone> = getRepository(Drone) 
	public orgRepo: Repository<Organization> = getRepository(Organization)

	@Query(() => [Drone])
	protected async drones(): Promise<Drone[]> {
		return this.droneRepo.find()
	}

	@Mutation(() => Drone)
	protected async createDrone(
		@Arg("name", () => String) name: string,
		@Arg("orgid", () => Int) orgid: number
	): Promise<Drone> {
		let org: Organization = await this.orgRepo.findOneOrFail({
			id: orgid
		})

		let drone: Drone = this.droneRepo.create({
			name: name,
			organization: org
		})

		return drone.save()
	}
	
	@Mutation(() => Boolean)
	protected async deleteDroneByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.droneRepo.delete({
			id: id
		})
		return true
	}
}