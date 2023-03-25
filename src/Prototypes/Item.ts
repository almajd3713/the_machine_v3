
import { ItemGeneric, ItemGenericConstructor } from "./Base/ItemGeneric";

interface ItemConstructor extends ItemGenericConstructor {

}

export class Item extends ItemGeneric {
  constructor(obj: ItemConstructor) {
    super(obj);
  }
}