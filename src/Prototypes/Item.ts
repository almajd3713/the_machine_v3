
import globals from "../globals";
import ItemProps from "../NodeGen/instances/Item";
import Util from "../Util";
import { ItemGeneric, ItemGenericConstructor } from "./Base/ItemGeneric";
import { Recipe, RecipeConstructor } from "./Recipe";

export interface ItemConstructor extends ItemGenericConstructor {
  description?: string
  recipe?: Partial<RecipeConstructor>
}

export interface itemElementsInterface {
  name?: HTMLElement
  icon?: HTMLImageElement
}

export class Item extends ItemGeneric {
  description: string
  recipe?: Recipe
  constructor(obj: ItemConstructor) {
    super(obj);
    this.description = obj.description || "";
    globals.itemList.push(this)

    if(obj.recipe) {
      let recipe = new Recipe({
        name: obj.recipe.name || this.name,
        id: obj.recipe.id || this.id,
        icon: obj.recipe.icon || this.icon,
        ingredients: obj.recipe.ingredients || [],
        results: obj.recipe.results || []
      })
      this.recipe = recipe
    }
  }

  create() {
    let item = new ItemInstance({
      name: this.name,
      id: this.id,
      description: this.description,
      icon: this.icon,
      isCountable: this.isCountable,
      count: this.count,
    })
    globals.inventoryList.push(item)
  }
}

export class ItemInstance extends Item {
  htmlDiv: HTMLElement
  itemElements: itemElementsInterface = {}

  constructor(obj: ItemConstructor) {
    super(obj);
    this.htmlDiv = Util.createNode(ItemProps);
    globals.inventoryList.push(this)
    this.initHTML()
    this.htmlDiv.addEventListener("click", _ => {
      globals.InventoryFirstClickChecker()
      globals.inventoryDescElements.name!.textContent = this.name
      globals.inventoryDescElements.icon!.src = this.icon
      globals.inventoryDescElements.description!.textContent = this.description
      globals.Dispatcher.dispatch('switchInventoryView', 'inventory')
    })
    

  }
  private initHTML() {
    this.itemElements.name = this.htmlDiv.querySelector(".name")!
    this.itemElements.icon = this.htmlDiv.querySelector("img")!

    this.itemElements.name.textContent = this.name
    this.itemElements.icon.src = this.icon
    
  }
}