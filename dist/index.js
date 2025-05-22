"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = exports.spinalOccupantService = void 0;
const CONSTANTS = require("./constants");
exports.CONSTANTS = CONSTANTS;
const OccupantService_1 = require("./services/OccupantService");
const spinalOccupantService = new OccupantService_1.default();
exports.spinalOccupantService = spinalOccupantService;
exports.default = spinalOccupantService;
//# sourceMappingURL=index.js.map