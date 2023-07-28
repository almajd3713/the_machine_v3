import Util from "../Util"

const inventory = Util.createNode(Util.stringToHTMLTree(`
  <div class="details">
    <div class="name"></div>
    <div class="description"></div>
  </div>
`))

const crafting = Util.createNode(Util.stringToHTMLTree(`
  <div class="craftingCont">
    <div class="currentCount"></div>
    <div class="ingredientsTitle">Ingredients: </div>
    <div class="ingredientsDiv">
    </div>
    <div class="productsDiv">
    </div>
    <button class="craftingBtn">Craft</button>
  </div>
`))

const equipment = Util.createNode(Util.stringToHTMLTree(`
  <div class="equipmentCont">
    <div class="durability"></div>
  </div>
`))

export default {
  crafting, equipment, inventory
}