import Util, { createNodeProps } from "../Util";

const ResourceProps: createNodeProps = Util.stringToHTMLTree(`
  <div class="resBlock">
    <div class="resIcon">
      <img src="" alt="">
    </div>
    <div class="resTitle"></div>
    <div class="resCountText">
      Amount: <span class="resCount">0</span>
    </div>
    <div class="resCountText">
      PPS: <span class="resCount">0/s</span>
    </div>
    <button>Generate</button>

  </div>
`)

export default ResourceProps