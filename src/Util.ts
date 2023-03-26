export interface createNodeProps {
  tag?: string
  className?: string | string[]
  id?: string
  src?: string
  attributes?: [string, string][]
  textContent?: string
  subNodes?: createNodeProps | createNodeProps[]
  onClick?: () => void 
  style?: Partial<CSSStyleDeclaration>
}

function createNode(props: createNodeProps): HTMLElement {
  let node = document.createElement(props.tag || "div")
  if (props.className) {
    if (Array.isArray(props.className)) props.className.forEach(classN => node.classList.add(classN))
    else node.className = props.className
  }
  if (props.id) { node.setAttribute("id", props.id) }
  if (props.src) { node.setAttribute("src", props.src) }
  if (props.attributes) {
    props.attributes.forEach(attr => {
      node.setAttribute(attr[0], attr[1])
    })
  }
  if (props.textContent) { node.innerHTML = props.textContent }
  if (props.subNodes) {
    if (props.subNodes instanceof HTMLElement) node.appendChild(props.subNodes)
    else if (Array.isArray(props.subNodes)) props.subNodes.forEach(subNode => {
      if (subNode instanceof HTMLElement) node.appendChild(subNode)
      else node.appendChild(createNode(subNode))
    }); else node.appendChild(createNode(props.subNodes))
  }
  if(props.style) for(let prop in props.style) {
    // @ts-ignore
    node.style[prop] = props.style[prop]
  }
  if (props.onClick) node.onclick = props.onClick
  return node
}

function propTreeGen(el: HTMLElement) {
  let propTree: createNodeProps = {};
  propTree.tag = el.tagName.toLowerCase()
  if(el.className.includes(" ")) propTree.className = el.className.split(" ")
  else propTree.className = el.className
  propTree.id = el.id
  //@ts-ignore
  propTree.src = el.src
  let forbiddenAttrs = ["class", "src", "id", "style", "onclick"]
  propTree.attributes = el.getAttributeNames().filter(item => 
    forbiddenAttrs.every(attr => item === attr)
  ).map(attr => [attr, el.getAttribute(attr)!])
  // I don't know the difference between `el.children` and `el.childNodes` but one somehow works. Whaterver
  propTree.textContent = [...el.childNodes].filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent).join("")
  if(el.children.length == 1) propTree.subNodes = propTreeGen(el.children[0] as HTMLElement)
  else if(el.children.length > 1) {
    propTree.subNodes = []
    for(const child of el.children) propTree.subNodes.push(propTreeGen(child as HTMLElement))
  } else propTree.subNodes = []
  propTree.onClick = el.onclick as typeof propTree.onClick
  return propTree
}

function stringToHTMLTree(treeStr: string) {
  let div = document.createElement("div") as HTMLElement
  div.innerHTML = treeStr.trim()
  div = div.firstChild as HTMLElement

  return propTreeGen(div)
}

let sleep = async(ms: number) => new Promise((resolve) => setTimeout(() => {
  resolve(true)
}, ms))

export default {
  createNode,
  stringToHTMLTree,
  sleep
}