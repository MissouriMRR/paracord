import {Controller, Mutation, Query} from "vesper";
import {EntityManager} from "typeorm";
import {Drone} from "../entity/Drone";

@Controller()
export class DroneController {

    constructor(private entityManager: EntityManager) {}

    //drones: [Drone]
    @Query()
    drones() {
        return this.entityManager.find(Drone);
    }

    //drone(id: Int): Drone
    @Query()
    drone({ id }) {
        return this.entityManager.findOne(Drone, id);
    }

    //droneSave(id: Int, name: String): Drone
    @Mutation()
    droneSave(args) {
        const drone = this.entityManager.create(Drone, args);
        return this.entityManager.save(Drone, drone);
    }

    //droneDelete(id: Int): Boolean
    @Mutation()
    async droneDelete({ id }) {
        await this.entityManager.delete(Drone, {id: id});
        return true;
    }

}