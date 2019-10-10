import {bootstrap} from "vesper";
import {DroneController} from "./controller/DroneController";
import {FlightController} from "./controller/FlightController";
import {Drone} from "./entity/Drone";
import {Flight} from "./entity/Flight";


bootstrap({
    port: 3000,
    controllers: [
        DroneController,
        FlightController
    ],
    entities: [
        Drone,
        Flight
    ],
    schemas: [__dirname + "/schema/**/*.graphql"]
}).then(() => {
    console.log("Run tests on http://localhost:3000/playground");

}).catch(error => {
    console.error(error.stack ? error.stack : error);
});