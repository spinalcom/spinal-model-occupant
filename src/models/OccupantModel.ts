import { spinalCore, Model } from "spinal-core-connectorjs_type";
import { IOccupant } from "../interfaces/IOccupant";


class OccupantModel extends Model {
   constructor(occupant: IOccupant) {
      super();
      this.add_attr(occupant);
   }
}



spinalCore.register_models(OccupantModel);
export default OccupantModel;
export {
   OccupantModel
}