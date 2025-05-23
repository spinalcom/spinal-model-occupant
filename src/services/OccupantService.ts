/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SpinalGraphService,
  SpinalNodeRef,
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_PTR_LST_TYPE,
  SPINAL_RELATION_LST_PTR_TYPE,
} from 'spinal-env-viewer-graph-service';

import * as CONSTANTS from '../constants';

import OccupantModel from '../models/OccupantModel';
import { IOccupant } from '../interfaces/IOccupant';
import AttributeService, {
  attributeService,
} from 'spinal-env-viewer-plugin-documentation-service';

export default class OccupantService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // #region CONTEXT
  /**
   * This method retrieves all the contexts in the graph and returns them as an array of SpinalNode.
   * @return {*}  {Promise<SpinalNode<any>[]>}
   * @memberof OccupantService
   */
  public async getContexts(): Promise<SpinalNode<any>[]> {
    const graph = SpinalGraphService.getGraph();
    const contexts: SpinalNode<any>[] = await graph.getChildren();
    return contexts.filter((context: SpinalNode<any>) => {
      return context.getType().get() === CONSTANTS.CONTEXT_TYPE;
    });
  }

  public async getContext(
    contextName: string
  ): Promise<SpinalNode<any> | undefined> {
    const contexts = await this.getContexts();
    if (!contexts) return undefined;
    return contexts.find((context) => context.getName().get() === contextName);
  }

  public async createOrGetContext(contextName: string): Promise<SpinalNode<any>> {
    const alreadyExists = await this.getContext(contextName);
    if( alreadyExists && alreadyExists.getType().get() != CONSTANTS.CONTEXT_TYPE) {
      throw new Error(`Context ${contextName} is not of type ${CONSTANTS.CONTEXT_TYPE}`);
    }
    if (alreadyExists) {
      console.warn(`Context ${contextName} already exists`);
      return alreadyExists;
    }
    return await SpinalGraphService.addContext(
      contextName,
      CONSTANTS.CONTEXT_TYPE,
      undefined
    );
  }

  // #endregion CONTEXT

  // #region OCCUPANT

  public async addOccupant(
    occupantInfo: IOccupant,
    contextName: string
  ): Promise<SpinalNode<any>> {
    occupantInfo.type = CONSTANTS.OCCUPANT_TYPE;
    //const entityModel = new EntityModel(entityInfo);
    const context = await this.getContext(contextName);
    if (!context) {
      throw new Error(`Context ${contextName} not found`);
    }
    const occupantModel = new OccupantModel(occupantInfo);
    const occupantNode = new SpinalNode(
      occupantInfo.occupantId,
      CONSTANTS.OCCUPANT_TYPE,
      occupantModel
    );

    await context.addChildInContext(
      occupantNode,
      CONSTANTS.CONTEXT_OCCUPANT_RELATION,
      SPINAL_RELATION_LST_PTR_TYPE,
      context
    );
    return occupantNode;
  }


  public async deleteAllOccupants(
    contextName: string
  ): Promise<void> {
    const context = await this.getContext(contextName);
    if (!context) {
      throw new Error(`Context ${contextName} not found`);
    }
    const occupants = await context.getChildren();
    for (const occupant of occupants) {
      await occupant.removeFromGraph();
    }
  }

  public async deleteOccupant(contextName: string, occupantId: string) {
    const context = await this.getContext(contextName);
    if (!context) {
      throw new Error(`Context ${contextName} not found`);
    }
    const occupant = await SpinalGraphService.getNode(occupantId);
    if (!occupant) {
      throw new Error(`Occupant ${occupantId} not found`);
    }
    await occupant.removeFromGraph();
    console.log(`Occupant ${occupantId} has been deleted from context ${contextName}`);  
  }

  public async getOccupants(
    contextName: string
  ): Promise<SpinalNode<any>[]> {
    const context = await this.getContext(contextName);
    if (!context) {
      throw new Error(`Context ${contextName} not found`);
    }
    const occupants = await context.getChildren();
    return occupants.filter((occupant: SpinalNode<any>) => {
      return occupant.getType().get() === CONSTANTS.OCCUPANT_TYPE;
    });
  }

  public async getOccupant(contextName: string, occupantId: string): Promise<SpinalNode<any> | undefined> {
    const context = await this.getContext(contextName);
    if (!context) {
      throw new Error(`Context ${contextName} not found`);
    }
    const occupants = await context.getChildren();
    return occupants.find((occupant) => occupant.getName().get() === occupantId);
  }

  // #endregion OCCUPANT
}
