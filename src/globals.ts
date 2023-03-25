import type { Resource } from "./Prototypes/Resource"

let globals = {
  resourceContainer: document.querySelector("#resourceContainer"),
  resourceList: [] as Resource[]
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