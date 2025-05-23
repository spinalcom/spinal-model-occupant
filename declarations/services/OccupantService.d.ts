import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { IOccupant } from '../interfaces/IOccupant';
export default class OccupantService {
    constructor();
    /**
     * This method retrieves all the contexts in the graph and returns them as an array of SpinalNode.
     * @return {*}  {Promise<SpinalNode<any>[]>}
     * @memberof OccupantService
     */
    getContexts(): Promise<SpinalNode<any>[]>;
    getContext(contextName: string): Promise<SpinalNode<any> | undefined>;
    createOrGetContext(contextName: string): Promise<SpinalNode<any>>;
    addOccupant(occupantInfo: IOccupant, contextName: string): Promise<SpinalNode<any>>;
    deleteAllOccupants(contextName: string): Promise<void>;
    deleteOccupant(contextName: string, occupantId: string): Promise<void>;
    getOccupants(contextName: string): Promise<SpinalNode<any>[]>;
    getOccupant(contextName: string, occupantId: string): Promise<SpinalNode<any> | undefined>;
}
