import { Model } from "spinal-core-connectorjs_type";
import { IOccupant } from "../interfaces/IOccupant";
declare class OccupantModel extends Model {
    constructor(occupant: IOccupant);
}
export default OccupantModel;
export { OccupantModel };
