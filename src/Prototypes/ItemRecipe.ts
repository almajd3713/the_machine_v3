
import { RecipeGeneric, RecipeConstructor } from "./Base/RecipeGeneric";
import { Item } from "./Item";


export class RecipeItem extends RecipeGeneric {
  constructor(obj: RecipeConstructor) {
    super(obj)
  }

  craft(count: number): void {
    
  }
}