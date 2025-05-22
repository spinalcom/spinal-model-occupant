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

  public async createContext(contextName: string): Promise<SpinalNode<any>> {
    const alreadyExists = await this.getContext(contextName);
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
      `${occupantInfo.first_name}_${occupantInfo.last_name}`,
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

  // #endregion OCCUPANT
}
