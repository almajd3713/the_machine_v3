import Events from "./Events"
import globals from "./globals"
import inventoryExtras from "./NodeGen/inventoryExtras"
import InventoryTabProps from "./NodeGen/InventoryTab"
import Util from "./Util"



export const preStartup = () => {
  setTimeout(() => document.querySelector("head")!.append(Util.createNode({
    tag: "style",
    textContent: `
      * {
        transition: all .5s;
      }
    `
  })), 500) 

  // Adding button functionality for switching pages
  let tabs = document.querySelectorAll(`[id$="Tab"]`)
  let tabBtns = [...document.querySelector("#sidebar")!.children] as HTMLButtonElement[]
  
  tabs.forEach((tab, i) => (tab as HTMLElement).style.left = `${100 * i}vw`)
  tabBtns.forEach((btn, i) => btn.addEventListener("click", () => tabs.forEach((tab, j) => {
    (tab as HTMLElement).style.left = `${(j - i) * 100 }vw`
  })))

  // Appending things to their appropriate pages
  let containers = containerGen()
  tabs.forEach((tab, i) => tab.appendChild(containers[i]))

  
  // Setting starting page
  tabBtns[1].click()
  
  // Generating Tabs content
  containers[1].appendChild(Util.createNode(InventoryTabProps))
  
  // Setting some globals
  containers.forEach((container, i) => {
    globals[container.id] = containers[i]
  })
  globals.inventoryListContainer = containers[1].querySelector(".itemDisplayTabInventory")
  let desContainer = containers[1].querySelector('.itemDescriptionTabInventory')
  globals.inventoryDescElements = {
    name: inventoryExtras!.inventory.querySelector('.name'),
    icon: desContainer!.querySelector('img'),
    description: inventoryExtras!.inventory.querySelector('.description'),
    extra: desContainer!.querySelector('.extra')
  };

  // Inventory desc starts without being displayed
  (desContainer!.children[0] as HTMLElement).style.opacity = '0'

  // Inventory/Crafting panel switcher
  let inventoryBtns = [...document.querySelector('.btnContainerInventory')!.children]
  inventoryBtns.forEach((btn, i) => btn.addEventListener('click', _ => globals.Loader(i + 1)))
  
}
export const postStartup = () => {
  globals.Loader(0)
  globals.Loader(1)
  listFilterer()

  globals.Dispatcher.dispatch('recipeInit')
  Events()


  //@ts-ignore
  window.globals = globals
}
const containerGen = () => {
  let containerStrs = ["resource", "inventory", "map"]
  let containerNodes = containerStrs.map(container => Util.createNode({id: `${container}Container`}))
  return containerNodes
}

const listFilterer = () => {
  globals.itemList = globals.itemList.filter(item => item.constructor.name.match(/\w+(Instance)/))
}