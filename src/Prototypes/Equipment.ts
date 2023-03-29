import globals from "../globals";
import ItemProps from "../NodeGen/instances/Item";
import Util from "../Util";
import { Item, ItemConstructor, itemElementsInterface } from "./Item";

interface EquipmentConstructor extends ItemConstructor {
  maxDurability: number
  durability?: number
}

export class Equipment extends Item {
  private _durability: [current: number, max: number] = [0, 0]

  constructor(obj: EquipmentConstructor) {
    super(obj)
    this.maxDurability = obj.maxDurability
    this.durability = this.maxDurability
    this.isCountable = false
    
  }
  get durability() {
    return this._durability[0]
  }
  set durability(newDur: number) {
    this._durability[1] = newDur
  }
  get maxDurability() {
    return this._durability[0]
  }
  set maxDurability(newDur: number) {
    this._durability[0] = newDur
  }
  create(durability?: number) {
    let equipment = new EquipmentInstance({
      name: this.name,
      id: this.id,
      description: this.description,
      icon: this.icon,
      isCountable: false,
      maxDurability: this.maxDurability,
      durability: durability ? durability : this.maxDurability
    })
    globals.inventoryList.push(equipment)
  }
  
}


export class EquipmentInstance extends Equipment {

  htmlDiv: HTMLElement
  equpimentElements: itemElementsInterface = {}

  constructor(obj: EquipmentConstructor) {
    super(obj);
    this.htmlDiv = Util.createNode(ItemProps);
    globals.inventoryList.push(this)
    this.initHTML()
    this.htmlDiv.addEventListener("click", _ => {
      globals.InventoryFirstClickChecker()
      globals.inventoryDescElements.name!.textContent = this.name
      globals.inventoryDescElements.icon!.src = this.icon
      globals.inventoryDescElements.description!.textContent = this.description
      globals.inventoryDescElements.extra!.textContent = `Durability: ${this.durability}/${this.maxDurability}`
    })
    
  }
  private initHTML() {
    this.equpimentElements.name = this.htmlDiv.querySelector(".name")!
    this.equpimentElements.icon = this.htmlDiv.querySelector("img")!

    this.equpimentElements.name.textContent = this.name
    this.equpimentElements.icon.src = this.icon

  }

}