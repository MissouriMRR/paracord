"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
var drone_1 = require("./drone");
var DroneResolver = /** @class */ (function () {
    function DroneResolver(droneRepository) {
        this.droneRepository = droneRepository;
    }
    DroneResolver.prototype.drones = function () {
        return this.droneRepository.find();
    };
    __decorate([
        type_graphql_1.Query(function (returns) { return [drone_1.Drone]; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DroneResolver.prototype, "drones", null);
    DroneResolver = __decorate([
        type_graphql_1.Resolver(function (of) { return drone_1.Drone; }),
        __param(0, typeorm_typedi_extensions_1.InjectRepository(drone_1.Drone)),
        __metadata("design:paramtypes", [typeorm_1.Repository])
    ], DroneResolver);
    return DroneResolver;
}());
exports.DroneResolver = DroneResolver;
