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
    createContext(contextName: string): Promise<SpinalNode<any>>;
    addOccupant(occupantInfo: IOccupant, contextName: string): Promise<SpinalNode<any>>;
}
