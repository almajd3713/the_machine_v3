import Util from "./Util"

export default () => {
  document.querySelector("head")!.append(Util.createNode({
    tag: "style",
    textContent: `
      * {
        transition: all .5s;
      }
    `
  })) 
}