import { Arg, Int, Mutation, Query, Resolver } from "type-graphql"
import { getRepository, Repository } from "typeorm"
import { Drone } from "../entities/drone"

@Resolver(() => Drone)
export class DroneResolver {
	public repository: Repository<Drone> = getRepository(Drone)

	@Query(() => [Drone])
	protected async drones(): Promise<Drone[]> {
		return this.repository.find()
	}

	@Mutation(() => Drone)
	protected async createDrone(
		@Arg("id", () => Int) id: number,
		@Arg("name", () => String) name: string
	): Promise<Drone> {
		const drone = this.repository.create({
			id: id,
			name: name
		})
		return drone.save()
	}

	@Mutation(() => Boolean)
	protected async deleteDroneByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.repository.delete({
			id: id
		})
		return true
	}
}