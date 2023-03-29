import type { Item } from "./Item"
import type { Equipment } from "./Equipment"
import type { Resource } from "./Resource"
import globals from "../globals"
import Util from "../Util"
import ItemProps from "../NodeGen/instances/Item"

export interface RecipeConstructor {
  name: string
  id: string
  ingredients: string[]
  results: string[]
  icon?: string
}

export class Recipe {
  name: string
  id: string
  ingredients: (Item | Equipment | Resource)[] = []
  ingredientsDiv: HTMLElement[] = []
  results: (Item | Equipment | Resource)[] = []
  resultsDiv: HTMLElement[] = []
  icon: string
  htmlDiv: HTMLElement
  constructor(obj: RecipeConstructor) {
    this.name = obj.name
    this.id = obj.id
    this.icon = obj.icon || globals.nullIcon
    this.htmlDiv = Util.createNode(ItemProps)
    this.htmlDiv.querySelector(".name")!.textContent = this.name
    this.htmlDiv.querySelector("img")!.src = this.icon
    globals.recipeList.push(this)

    this.divInitiator()

    this.htmlDiv.addEventListener("click", _ => {
      globals.InventoryFirstClickChecker()
      globals.inventoryDescElements.name!.textContent = this.name
      globals.inventoryDescElements.icon!.src = this.icon
      globals.inventoryDescElements.extra!.textContent = ''

      globals.inventoryExtras.crafting.remove();
      [...globals.inventoryExtras.crafting.children].forEach(child => child.remove())
      this.ingredientsDiv.forEach(el => {
        globals.inventoryExtras.crafting.appendChild(el)
      })
      globals.inventoryDescElements.extra!.appendChild(globals.inventoryExtras.crafting)
    })
  }
  divInitiator() {
    this.ingredients.forEach((ingredient, i) => {
      this.ingredientsDiv.push(Util.createNode({
        className: "ingredient",
        textContent: `${i + 1}: ${ingredient.name}`
      }))
    })
    this.results.forEach((result, i) => {
      this.resultsDiv.push(Util.createNode({
        className: "result",
        textContent: `${i + 1}: ${result.name}`
      }))
    })
  }
}