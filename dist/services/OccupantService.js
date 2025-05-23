"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const CONSTANTS = require("../constants");
const OccupantModel_1 = require("../models/OccupantModel");
class OccupantService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    // #region CONTEXT
    /**
     * This method retrieves all the contexts in the graph and returns them as an array of SpinalNode.
     * @return {*}  {Promise<SpinalNode<any>[]>}
     * @memberof OccupantService
     */
    getContexts() {
        return __awaiter(this, void 0, void 0, function* () {
            const graph = spinal_env_viewer_graph_service_1.SpinalGraphService.getGraph();
            const contexts = yield graph.getChildren();
            return contexts.filter((context) => {
                return context.getType().get() === CONSTANTS.CONTEXT_TYPE;
            });
        });
    }
    getContext(contextName) {
        return __awaiter(this, void 0, void 0, function* () {
            const contexts = yield this.getContexts();
            if (!contexts)
                return undefined;
            return contexts.find((context) => context.getName().get() === contextName);
        });
    }
    createOrGetContext(contextName) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExists = yield this.getContext(contextName);
            if ((alreadyExists === null || alreadyExists === void 0 ? void 0 : alreadyExists.getType().get()) != CONSTANTS.CONTEXT_TYPE) {
                throw new Error(`Context ${contextName} is not of type ${CONSTANTS.CONTEXT_TYPE}`);
            }
            if (alreadyExists) {
                console.warn(`Context ${contextName} already exists`);
                return alreadyExists;
            }
            return yield spinal_env_viewer_graph_service_1.SpinalGraphService.addContext(contextName, CONSTANTS.CONTEXT_TYPE, undefined);
        });
    }
    // #endregion CONTEXT
    // #region OCCUPANT
    addOccupant(occupantInfo, contextName) {
        return __awaiter(this, void 0, void 0, function* () {
            occupantInfo.type = CONSTANTS.OCCUPANT_TYPE;
            //const entityModel = new EntityModel(entityInfo);
            const context = yield this.getContext(contextName);
            if (!context) {
                throw new Error(`Context ${contextName} not found`);
            }
            const occupantModel = new OccupantModel_1.default(occupantInfo);
            const occupantNode = new spinal_env_viewer_graph_service_1.SpinalNode(occupantInfo.occupantId, CONSTANTS.OCCUPANT_TYPE, occupantModel);
            yield context.addChildInContext(occupantNode, CONSTANTS.CONTEXT_OCCUPANT_RELATION, spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE, context);
            return occupantNode;
        });
    }
    deleteAllOccupants(contextName) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.getContext(contextName);
            if (!context) {
                throw new Error(`Context ${contextName} not found`);
            }
            const occupants = yield context.getChildren();
            for (const occupant of occupants) {
                yield occupant.removeFromGraph();
            }
        });
    }
    deleteOccupant(contextName, occupantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.getContext(contextName);
            if (!context) {
                throw new Error(`Context ${contextName} not found`);
            }
            const occupant = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getNode(occupantId);
            if (!occupant) {
                throw new Error(`Occupant ${occupantId} not found`);
            }
            yield occupant.removeFromGraph();
            console.log(`Occupant ${occupantId} has been deleted from context ${contextName}`);
        });
    }
    getOccupants(contextName) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.getContext(contextName);
            if (!context) {
                throw new Error(`Context ${contextName} not found`);
            }
            const occupants = yield context.getChildren();
            return occupants.filter((occupant) => {
                return occupant.getType().get() === CONSTANTS.OCCUPANT_TYPE;
            });
        });
    }
    getOccupant(contextName, occupantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.getContext(contextName);
            if (!context) {
                throw new Error(`Context ${contextName} not found`);
            }
            const occupants = yield context.getChildren();
            return occupants.find((occupant) => occupant.getName().get() === occupantId);
        });
    }
}
exports.default = OccupantService;
//# sourceMappingURL=OccupantService.js.map