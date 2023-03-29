import Util from "../Util";


let InventoryTabProps = Util.stringToHTMLTree(`
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
          <div class="extra">

          </div>
        </div>
      </div>
    </div>
  </div>
`)
// < div class="line-break" > </div>



export default InventoryTabProps