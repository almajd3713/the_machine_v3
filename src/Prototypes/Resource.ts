
import globals from "../globals";
import ResourceProps from "../NodeGen/Resource";
import Util from "../Util";
import {ItemGeneric, ItemGenericConstructor} from "./Base/ItemGeneric";

interface ResourceConstructor extends ItemGenericConstructor {
  mineable: boolean;
  baseTime?: number;
}

interface htmlElementsInterface {
  title: HTMLElement,
  icon: HTMLImageElement,
  counter: HTMLElement
  pps: HTMLElement
  genBtn: HTMLButtonElement

}

export class Resource extends ItemGeneric {
  mineable: boolean;
  baseTime?: number;
  //@ts-ignore
  htmlDiv: HTMLElement
  //@ts-ignore
  htmlElements: htmlElementsInterface = {}
  pps: number = 0;

  constructor(obj: ResourceConstructor) {
    super(obj);
    this.mineable = obj.mineable;
    if(this.mineable) {
      this.baseTime = obj.baseTime || 1000;
      this.htmlDiv = Util.createNode(ResourceProps)
      globals.resourceContainer?.appendChild(this.htmlDiv)
      this.initHTML()
      this.htmlElements.genBtn.addEventListener("click", () => {
        this.count!++
        this.updateUI()
      })
    }
    globals.resourceList.push(this)
  }
  private initHTML() {
    this.htmlElements = {
    title   :this.htmlDiv.querySelector(".resTitle") as HTMLElement,
    icon    :this.htmlDiv.querySelector("img") as HTMLImageElement,
    counter :this.htmlDiv.querySelectorAll(".resCount")[0] as HTMLElement,
    pps     :this.htmlDiv.querySelectorAll(".resCount")[1] as HTMLElement,
    genBtn  :this.htmlDiv.querySelector("button") as HTMLButtonElement
    }
    this.htmlElements.title.textContent = this.name
    this.htmlElements.icon.src = this.icon
    this.htmlElements.counter.textContent = '0'
    this.htmlElements.pps.textContent = '0'
  }
  public updateUI() {
    if(this.isCountable) {
      this.htmlElements.counter.textContent = `${this.count}`
      this.htmlElements.pps.textContent = `${this.pps}/s`
    }
  }
}