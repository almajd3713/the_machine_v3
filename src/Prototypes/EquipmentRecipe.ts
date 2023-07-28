
import { RecipeGeneric, RecipeConstructor } from "./Base/RecipeGeneric";
import { Equipment } from "./Equipment";


export class RecipeEquipment extends RecipeGeneric {
  constructor(obj: RecipeConstructor) {
    super(obj)
  }

  craft(count: number): void {
    
  }
}