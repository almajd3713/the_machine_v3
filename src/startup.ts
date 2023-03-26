import globals from "./globals"
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
  console.log(InventoryTabProps)
  containers[1].appendChild(Util.createNode(InventoryTabProps))
  
  // Setting some globals
  containers.forEach((container, i) => {
    globals[container.id] = containers[i]
  })
  globals.inventoryListContainer = containers[1].querySelector(".itemDisplayTabInventory")
  let desContainer = containers[1].querySelector('.itemDescriptionTabInventory')
  globals.inventoryDescElements = {
    name: desContainer!.querySelector('.name'),
    icon: desContainer!.querySelector('img'),
    description: desContainer!.querySelector('.description'),
    durability: desContainer!.querySelector('.durability')
  };

  // Inventory desc starts without being displayed
  (desContainer!.children[0] as HTMLElement).style.opacity = '0'
  
  globals.Loader("resources")
}
export const postStartup = () => {
  globals.Loader("resources")
  globals.Loader("inventory")
}
const containerGen = () => {
  let containerStrs = ["resource", "inventory", "map"]
  let containerNodes = containerStrs.map(container => Util.createNode({id: `${container}Container`}))
  return containerNodes
}