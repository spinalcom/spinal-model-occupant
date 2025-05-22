import { IOccupant } from './interfaces/IOccupant';

import * as CONSTANTS from './constants';

import OccupantService from './services/OccupantService';


const spinalOccupantService = new OccupantService();


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const globalRoot: any = typeof window === 'undefined' ? global : window;
// if (typeof globalRoot.spinal === 'undefined') globalRoot.spinal = {};

// if (typeof globalRoot.spinal.spinalAnalyticNodeManagerService === 'undefined') {
//   globalRoot.spinal.spinalAnalyticNodeManagerService = spinalAnalyticNodeManagerService;
// }

// if (typeof globalRoot.spinal.spinalAnalyticService === 'undefined') {
//   globalRoot.spinal.spinalAnalyticService = spinalAnalyticService;
// }

export {
  spinalOccupantService,
  CONSTANTS,
  IOccupant
};

export default spinalOccupantService;
