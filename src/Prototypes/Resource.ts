
import globals from "../globals";
import ResourceProps from "../NodeGen/instances/Resource";
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
  time: HTMLElement
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
  timer = Util.createNode({
    className: "resCountText",
    textContent: "Time",
    style: {
      marginTop: "1rem"
    },
    subNodes: {
      tag: "span",
      className: "resCount",
      textContent: "0s",
    }
  })

  constructor(obj: ResourceConstructor) {
    super(obj);
    this.mineable = obj.mineable;
    if(this.mineable) {
      this.baseTime = obj.baseTime || 1000;
      this.htmlDiv = Util.createNode(ResourceProps)
      this.initHTML()
      this.htmlElements.genBtn.addEventListener("click", () => {
        this.generate()
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
    genBtn  :this.htmlDiv.querySelector("button") as HTMLButtonElement,
    time    :this.htmlDiv.querySelectorAll(".resCountText")[2] as HTMLElement
    }
    this.htmlElements.title.textContent = this.name
    this.htmlElements.icon.src = this.icon
    this.htmlElements.counter.textContent = '0'
    this.htmlElements.pps.textContent = '0/s'
  }
  public updateUI() {
    if(this.isCountable) {
      this.htmlElements.counter.textContent = `${this.count}`
      this.htmlElements.pps.textContent = `${this.pps}/s`
    }
  }
  private async generate() {
    let time = this.baseTime!
    this.timer.children[0].textContent = `${time / 1000}s`
    this.htmlDiv.appendChild(this.timer)
    this.htmlElements.genBtn.disabled = true
    while(time > 0) {
      await Util.sleep(1000)
      time-=1000
      this.timer.children[0].textContent = `${time / 1000}s`
      this.updateUI()
    }
    this.htmlElements.genBtn.disabled = false
    this.timer.remove()
    this.count!++
    this.updateUI()
  }
}