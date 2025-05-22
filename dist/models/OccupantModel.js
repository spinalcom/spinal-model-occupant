"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OccupantModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
class OccupantModel extends spinal_core_connectorjs_type_1.Model {
    constructor(occupant) {
        super();
        this.add_attr(occupant);
    }
}
exports.OccupantModel = OccupantModel;
spinal_core_connectorjs_type_1.spinalCore.register_models(OccupantModel);
exports.default = OccupantModel;
//# sourceMappingURL=OccupantModel.js.map