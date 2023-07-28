import Dispatcher from "./Dispatcher";
import { Equipment, EquipmentInstance } from "./Prototypes/Equipment";
import { Item } from "./Prototypes/Item";
// import { Recipe } from "./Prototypes/Base/RecipeGeneric";
import { Resource } from "./Prototypes/Resource"
import Util from "./Util";
import { ItemGeneric } from "./Prototypes/Base/ItemGeneric";

enum loadingType {
  resources, inventory, crafting
}
interface globalsInterface {
  Dispatcher: typeof Dispatcher
  Loader: (type: loadingType) => void
  InventoryFirstClickChecker: () => void
  resourceContainer: HTMLElement | null
  list: ItemGeneric[]
  inventoryList: ItemGeneric[]

  inventoryListContainer: HTMLElement | null,
  inventoryDescElements: {
    name: HTMLElement | null
    description: HTMLElement | null
    icon: HTMLImageElement | null
    extra: HTMLElement | null
  },

  [key: string]: any
}

let globals: globalsInterface = {
  Dispatcher,
  inventoryList: [],

  resourceContainer: null,
  list: [],
  inventoryListContainer: null,
  inventoryDescElements: {
    name: null,
    description: null,
    icon: null,
    extra: null
  },
  Loader() {
    let inventoryListChildren = [...this.inventoryListContainer!.children]
    for(const item of this.list) {
      switch (item.constructor.name) {
        case "ItemPrototype":
          this.resourceContainer!.appendChild((item as Item).htmlDiv)
          break;
        case "EquipmentPrototype":
          inventoryListChildren.forEach(child => child.remove())
          this.inventoryListContainer!.appendChild((item as Equipment).htmlDiv)
        case "ResourcePrototype":
          inventoryListChildren.forEach(child => child.remove())
          this.inventoryListContainer!.appendChild((item as Resource).htmlDiv)
      }
    }
    // switch (type) {
    //   case 0:
    //     this.resourceList.forEach(resource => this.resourceContainer!.appendChild(resource.htmlDiv))
    //     break;
    //   case 1:
    //     inventoryListChildren.forEach(child => child.remove())
    //     this.inventoryList.forEach(equipment => this.inventoryListContainer!.appendChild(equipment.htmlDiv))
    //     break;
    //   case 2:
    //     inventoryListChildren.forEach(child => child.remove())
    //     this.recipeList.forEach(recipe => this.inventoryListContainer!.appendChild(recipe.htmlDiv))
    //   }
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
  for(const item of globals.list) {
    if(item.constructor.name === "Resource") {
      if(item.isCountable) {
      prev = item.count!
      setTimeout(() => {
        current = item.count!;
        (item as Resource).pps = (current - prev) / 2;
        (item as Resource).updateUI()
      }, 1000);
    }
    }
  }
  // globals.resourceList.forEach(res => {
  //   if(res.isCountable) {
  //     prev = res.count!
  //     setTimeout(() => {
  //       current = res.count!
  //       res.pps = (current - prev) / 2;
  //       res.updateUI()
  //     }, 1000);
  //   }
  // })
}, 2000);


export default globals