// import type { Item } from "./Item"
import { ItemGeneric } from "./ItemGeneric"
import globals from "../../globals"
import Util from "../../Util"
import ItemProps from "../../NodeGen/instances/Item"
import inventoryExtras from "../../NodeGen/inventoryExtras"

export interface RecipeConstructor {
  name: string
  id: string
  ingredients: (string | [item: string, count: number])[]
  results: (string | [item: string, count: number])[]
  icon?: string
}

export class RecipeGeneric {
  name: string
  id: string
  ingredients: [item: ItemGeneric, count: number][] = []
  ingredientsDiv: HTMLElement[] = []
  results: [item: ItemGeneric, count: number][] = []
  resultsDiv: HTMLElement[] = []
  icon: string
  htmlDiv: HTMLElement
  constructor(obj: RecipeConstructor) {
    this.name = obj.name
    this.id = obj.id
    this.icon = obj.icon || globals.nullIcon
    globals.Dispatcher.addEventListener('recipeInit', () => {
      this.ingredients = obj.ingredients.reduce<typeof this.ingredients>((newArr, ingredient) => {
        let desired = globals.itemList.find(item => Array.isArray(ingredient) ? item.id === ingredient[0] : item.id === ingredient)
        // {
        //   if (Array.isArray(ingredient)) return item.id === ingredient[0]
        //   else return item.id === ingredient
        // }
          || globals.resourceList.find(resource => Array.isArray(ingredient) ? resource.id === ingredient[0] : resource.id === ingredient);
        if (desired) { newArr.push([desired, Array.isArray(ingredient) ? ingredient[1] : 1]); return newArr }
        else {
          console.error("ERR: item id ", ingredient, " does not exist")
          return newArr
        }
      }, [])
      this.results = obj.results.reduce<typeof this.results>((newArr, result) => {
        let desired = globals.itemList.find(item => Array.isArray(result) ? item.id === result[0] : item.id === result)
          || globals.resourceList.find(resource => resource.name === result);
        if (desired) { newArr.push([desired, Array.isArray(result) ? result[1] : 1]); return newArr }
        else {
          console.error("ERR: item id ", result, " does not exist")
          return newArr
        }
      }, [])
      this.divInitiator()
    })
    this.htmlDiv = Util.createNode(ItemProps)
    this.htmlDiv.querySelector(".name")!.textContent = this.name
    this.htmlDiv.querySelector("img")!.src = this.icon
    globals.recipeList.push(this)

    this.htmlDiv.addEventListener("click", _ => {
      globals.InventoryFirstClickChecker()
      globals.inventoryDescElements.name!.textContent = this.name
      globals.inventoryDescElements.icon!.src = this.icon
      globals.inventoryDescElements.extra!.textContent = '';
      if (!(this.results.length - 1) && this.results[0][0].isCountable) inventoryExtras.crafting!.querySelector(".currentCount")!.textContent = `Amount: ${this.results[0][0].count}`
      else inventoryExtras.crafting!.querySelector(".currentCount")!.textContent = ""

      inventoryExtras.crafting.querySelectorAll('.ingredient').forEach(child => child.remove())
      this.ingredientsDiv.forEach(el => {
       inventoryExtras.crafting.querySelector('.ingredientsDiv')!.appendChild(el)
      })
      globals.Dispatcher.dispatch('switchInventoryView', 'crafting')
    })
  }
  divInitiator() {
    this.ingredients.forEach(ingredient => {
      this.ingredientsDiv.push(Util.createNode({
        className: "ingredient",
        textContent: `-  ${ingredient[0].name}  (${ingredient[1]})`
      }))
    })
    this.results.forEach(result => {
      this.resultsDiv.push(Util.createNode({
        className: "result",
        textContent: `-  ${result[0].name}  ${result[1]}`
      }))
    })
  }

  craft(count: number) {} //{
    // let canCraft = true
    // for(let ingredient of this.ingredients) {
    //   let desired = globals.inventoryList.find(item => item.id === ingredient[0].id)
    //             ||  globals.resourceList.find(resource => resource.id === ingredient[0].id)
    //   if(!desired) canCraft = false
    //   else {
    //     if((desired instanceof Resource || desired instanceof ItemInstance) && desired.isCountable) canCraft = desired.count! - ingredient[1] >= 0
    //     else if(desired instanceof EquipmentInstance) canCraft = desired.durability - ingredient[1] >= 0
    //   }  
    // }
    // // console.log('canCraft')
    // // if(canCraft) {
    // //   for (let ingredient of this.ingredients) {
    // //     let desired = globals.inventoryList.find(item => item.id === ingredient[0].id)
    // //       || globals.resourceList.find(resource => resource.id === ingredient[0].id)
    // //     desired
    // //   }
    // // }
  // }
}