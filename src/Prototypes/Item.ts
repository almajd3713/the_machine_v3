
import globals from "../globals";
import ItemProps from "../NodeGen/instances/Item";
import Util from "../Util";
import { ItemGeneric, ItemGenericConstructor } from "./Base/ItemGeneric";
import { Recipe, RecipeConstructor } from "./Recipe";

export interface ItemConstructor extends ItemGenericConstructor {
  description?: string
  recipe?: RecipeConstructor
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
      let recipe = new Recipe(obj.recipe)
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
      if (globals.inventoryDescElements.extra!.textContent) 
          globals.inventoryDescElements.extra!.textContent = ""
    })

  }
  private initHTML() {
    this.itemElements.name = this.htmlDiv.querySelector(".name")!
    this.itemElements.icon = this.htmlDiv.querySelector("img")!

    this.itemElements.name.textContent = this.name
    this.itemElements.icon.src = this.icon
    
  }
}