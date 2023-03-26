import { Equipment, EquipmentInstance } from "./Prototypes/Equipment";
import { Item, ItemInstance } from "./Prototypes/Item";
import { Resource } from "./Prototypes/Resource"

type loadingType = "inventory" | "crafting" | "resources"
interface globalsInterface {
  Loader: (type: loadingType) => void
  resourceContainer: HTMLElement | null
  resourceList: Resource[]

  itemList: Item[],
  EquipmentList: Equipment[]
  inventoryList: (ItemInstance | EquipmentInstance)[],
  inventoryListContainer: HTMLElement | null,
  inventoryDescElements: {
    name: HTMLElement | null
    description: HTMLElement | null
    icon: HTMLImageElement | null
    durability: HTMLElement | null
  }

  [key: string]: any
}

let globals: globalsInterface = {

  resourceContainer: null,
  resourceList: [],
  itemList: [],
  EquipmentList: [],
  inventoryList: [],
  inventoryListContainer: null,
  inventoryDescElements: {
    name: null,
    description: null,
    icon: null,
    durability: null
  },
  Loader(type) {
    switch (type) {
      case "resources":
        this.resourceList.forEach(resource => this.resourceContainer!.appendChild(resource.htmlDiv))
        break;
      case "inventory":
        [...this.inventoryListContainer!.children].forEach(child => child.remove)
        this.inventoryList.forEach(equipment => this.inventoryListContainer!.appendChild(equipment.htmlDiv))
        break;
      case "crafting":

    }
    },
  hasNotClickedInventoryItem: true
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