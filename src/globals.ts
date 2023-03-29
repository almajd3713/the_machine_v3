import { inventoryExtraProps } from "./NodeGen/inventoryExtra/crafting";
import { Equipment, EquipmentInstance } from "./Prototypes/Equipment";
import { Item, ItemInstance } from "./Prototypes/Item";
import { Recipe } from "./Prototypes/Recipe";
import { Resource } from "./Prototypes/Resource"
import Util from "./Util";

enum loadingType {
  resources, inventory, crafting
}
interface globalsInterface {
  Loader: (type: loadingType) => void
  InventoryFirstClickChecker: () => void
  resourceContainer: HTMLElement | null
  resourceList: Resource[]

  itemList: (Item | Equipment)[]
  recipeList: Recipe[]


  inventoryList: (ItemInstance | EquipmentInstance)[],
  inventoryListContainer: HTMLElement | null,
  inventoryDescElements: {
    name: HTMLElement | null
    description: HTMLElement | null
    icon: HTMLImageElement | null
    extra: HTMLElement | null
  },
  inventoryExtras: {
    crafting: HTMLElement
  }

  [key: string]: any
}

let globals: globalsInterface = {

  resourceContainer: null,
  resourceList: [],
  itemList: [],
  inventoryList: [],
  recipeList: [],
  inventoryListContainer: null,
  inventoryDescElements: {
    name: null,
    description: null,
    icon: null,
    extra: null
  },
  inventoryExtras: {
    crafting: Util.createNode(inventoryExtraProps)
  },
  Loader(type) {
    let inventoryListChildren = [...this.inventoryListContainer!.children]
    switch (type) {
      case 0:
        this.resourceList.forEach(resource => this.resourceContainer!.appendChild(resource.htmlDiv))
        break;
      case 1:
        inventoryListChildren.forEach(child => child.remove())
        this.inventoryList.forEach(equipment => this.inventoryListContainer!.appendChild(equipment.htmlDiv))
        break;
      case 2:
        inventoryListChildren.forEach(child => child.remove())
        this.recipeList.forEach(recipe => this.inventoryListContainer!.appendChild(recipe.htmlDiv))
      }
    },
  InventoryFirstClickChecker() {
    if(this.hasNotClickedInventoryItem) {
      if (globals.hasNotClickedInventoryItem) {
        (globals.inventoryDescElements.extra!.parentElement as HTMLElement).style.opacity = '1'
        globals.hasNotClickedInventoryItem = false
      }
    }
  },
  hasNotClickedInventoryItem: true,
  nullIcon: "/svg/nullIcon.svg"
}
setInterval(() => {
  let prev: number, current: number;
  globals.resourceList.forEach(res => {
    if(res.isCountable) {
      prev = res.count!
      setTimeout(() => {
        current = res.count!
        res.pps = (current - prev) / 2;
        res.updateUI()
      }, 1000);
    }
  })
}, 2000);

export default globals