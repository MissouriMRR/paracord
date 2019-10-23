
import { Query, Resolver } from "type-graphql";
import { Repository, getRepository} from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Drone } from "./drone";


@Resolver(() => Drone)
export class DroneResolver {
	public repository: Repository<Drone> = getRepository(Drone); 
	@Query(() => [Drone])
	protected async drones(): Promise<Drone[]> {
		return this.repository.find(); // TODO 
	}
}
