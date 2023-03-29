import Prototypes from "./Prototypes"
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

let item2 = new Prototypes.Item({
  name: "Drill",
  id: "drill1",
  isCountable: false,
  icon: '/svg/drill.svg',
  description: "An automated tool for mining. Very convenient eh?",
  recipe: {
    ingredients: ['pickaxe1', 'wood'],
    results: []
  }
})

let item1 = new Prototypes.Equipment({
  name: "Stone Pickaxe",
  id: "pickaxe1",
  icon: '/svg/pickaxe.svg',
  isCountable: true,
  count: 5,
  description: "A state of the art tool for the excavation of goods",
  maxDurability: 100,
  recipe: {
    name: "Stone pickaxe",
    id: "pickaxe1",
    ingredients: ['wood', 'drill1'],
    results: []
  }
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
window.Resource = Prototypes.Resource