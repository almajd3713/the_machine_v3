
import globals from "../globals";
import ItemProps from "../NodeGen/instances/Item";
import Util from "../Util";
import { ItemGeneric, ItemGenericConstructor } from "./Base/ItemGeneric";

export interface ItemConstructor extends ItemGenericConstructor {
  description?: string
}

export interface itemElementsInterface {
  name?: HTMLElement
  icon?: HTMLImageElement
}

export class Item extends ItemGeneric {
  description: string
  constructor(obj: ItemConstructor) {
    super(obj);
    this.description = obj.description || "";
    globals.itemList.push(this)
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
      if (globals.hasNotClickedInventoryItem) {
        (globals.inventoryDescElements.durability!.parentElement as HTMLElement).style.opacity = '1'
        globals.hasNotClickedInventoryItem = false
      }
      globals.inventoryDescElements.name!.textContent = this.name
      globals.inventoryDescElements.icon!.src = this.icon
      globals.inventoryDescElements.description!.textContent = this.description
      if (globals.inventoryDescElements.durability!.textContent) 
          globals.inventoryDescElements.durability!.textContent = ""
    })
  }
  private initHTML() {
    this.itemElements.name = this.htmlDiv.querySelector(".name")!
    this.itemElements.icon = this.htmlDiv.querySelector("img")!

    this.itemElements.name.textContent = this.name
    this.itemElements.icon.src = this.icon
    
  }
}