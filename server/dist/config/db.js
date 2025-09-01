"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.AgencyType = void 0;
const client_1 = require("@prisma/client");
var AgencyType;
(function (AgencyType) {
    AgencyType[AgencyType["BUS"] = 0] = "BUS";
    AgencyType[AgencyType["TRAIN"] = 1] = "TRAIN";
})(AgencyType || (exports.AgencyType = AgencyType = {}));
exports.prisma = new client_1.PrismaClient;
