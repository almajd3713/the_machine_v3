import Prototypes from "./Prototypes"
import Util from "./Util";
import startup from "./startup"
setTimeout(startup, 500);

let res1 = new Prototypes.Resource({
  name: "Wood",
  id: "wood",
  icon: "/wood.svg",
  isCountable: true,
  mineable: true
})

//@ts-ignore
window.Util = Util
console.log(res1)