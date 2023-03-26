import Util, {createNodeProps} from "../../Util";

let ItemProps: createNodeProps = Util.stringToHTMLTree(`
  <div class="inventoryItem">
    <div class="icon">
      <img src="">
    </div>
    <div class="name"></div>
  </div>
`)

export default ItemProps