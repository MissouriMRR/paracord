import {Controller, Mutation, Query} from "vesper";
import {EntityManager} from "typeorm";
import {Flight} from "../entity/Flight";

@Controller()
export class FlightController {

    constructor(private entityManager: EntityManager) {}

    //flights: [Flight]
    @Query()
    flights() {
        return this.entityManager.find(Flight);
    }

    //flight(id: Int): Flight
    @Query()
    flight({ id }) {
        return this.entityManager.findOne(Flight, id);
    }

    //flightSave(id: Int, description: String, location: String, terrain: String, weather: String, date: String): Flight
    @Mutation()
    flightSave(args) {
        const flight = this.entityManager.create(Flight, args);
        return this.entityManager.save(Flight, flight);
    }

    //flightDelete(id: Int): Boolean
    @Mutation()
    async flightDelete({ id }) {
        await this.entityManager.delete(Flight, {id: id});
        return true;
    }

}