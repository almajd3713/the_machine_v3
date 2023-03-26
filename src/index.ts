import Prototypes from "./Prototypes"
import Util from "./Util";
import * as Startup from "./startup"

Startup.preStartup()

let res1 = new Prototypes.Resource({
  name: "Wood",
  id: "wood",
  icon: "/svg/wood.svg",
  isCountable: true,
  baseTime: 5000,
  mineable: true
})

let item1 = new Prototypes.Equipment({
  name: "Stone Pickaxe",
  id: "pickaxe1",
  isCountable: true,
  count: 5,
  icon: '/svg/pickaxe.svg',
  description: "A state of the art tool for the excavation of goods",
  maxDurability: 100
})

let item2 = new Prototypes.Item({
  name: "Drill",
  id: "drill1",
  isCountable: false,
  icon: '/svg/drill.svg',
  description: "An automated tool for mining. Very convenient eh?"
})

item2.create()
item2.create()
item1.create()
item1.create()
item2.create()
item1.create()
item1.create()
item2.create()
item2.create()
item2.create()
item1.create()
item1.create()
item2.create()
item2.create()
item2.create()
item1.create()
item2.create()
item2.create()

item1.create()
item2.create()


Startup.postStartup()



//@ts-ignore
window.Util = Util
console.log(res1)