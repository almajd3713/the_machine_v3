import Util, { createNodeProps } from "../Util";


let InventoryTabProps: createNodeProps = Util.stringToHTMLTree(`
  <div class="inventoryGenWrapper">
    <div class="btnContainerInventory">
      <button class="inventoryBtn">Inventory</button>
      <button class="craftingBtn">Crafting</button>
    </div>
    <div class="tabsInventory">
      <div class="itemDisplayTabInventory">
      </div>
      <div class="itemDescriptionTabInventory">
        <div class="itemDescWrapper">
          <div class="icon">
            <img src="" alt="">
          </div>
          <div class="details">
            <div class="name"></div>
            <div class="description"></div>
            </div>
          <div class="line-break"></div>
          <div class="durability"></div>
        </div>
      </div>
    </div>
  </div>
`)


export default InventoryTabProps