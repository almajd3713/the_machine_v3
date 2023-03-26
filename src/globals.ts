import type { Resource } from "./Prototypes/Resource"

let globals: {[key:string]: any} = {
  resourceContainer: null as HTMLElement | null,
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