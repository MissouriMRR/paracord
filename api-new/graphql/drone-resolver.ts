
import { Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Drone } from "./drone";


@Resolver(of => Drone)
export class DroneResolver {
	constructor(
		@InjectRepository(Drone)
		private droneRepository: Repository<Drone>
	) { }

	@Query(returns => [Drone])
	drones(): Promise<Drone[]> {
		return this.droneRepository.find(); // TODO 
	}

}
