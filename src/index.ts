import Prototypes from "./Prototypes"
import Util from "./Util";
import startup from "./startup"

startup()

let res1 = new Prototypes.Resource({
  name: "Wood",
  id: "wood",
  icon: "/svg/wood.svg",
  isCountable: true,
  baseTime: 5000,
  mineable: true
})

//@ts-ignore
window.Util = Util
console.log(res1)