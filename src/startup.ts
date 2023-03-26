import globals from "./globals"
import Util from "./Util"

export default () => {
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

  // Setting some globals
  containers.forEach((container, i) => {
    globals[container.id] = containers[i]
  })

  // Setting starting page
  tabBtns[1].click()
  
  //@ts-ignore
  window.containers = containers
}

const containerGen = () => {
  let containerStrs = ["resource", "crafting", "map"]
  let containerNodes = containerStrs.map(container => Util.createNode({id: `${container}Container`}))
  return containerNodes
}