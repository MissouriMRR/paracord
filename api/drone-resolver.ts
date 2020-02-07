import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository} from "typeorm"
import { Drone } from "./drone"

@Resolver(() => Drone)
export class DroneResolver {
	public droneRepo: Repository<Drone> = getRepository(Drone) 

	@Query(() => [Drone])
	protected async drones(): Promise<Drone[]> {
		return this.droneRepo.find()
	}

	@Mutation(() => Drone)
	protected async createDrone(
		@Arg("name", () => String) name: string
	): Promise<Drone> {

		let drone: Drone = this.droneRepo.create({
			name: name
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