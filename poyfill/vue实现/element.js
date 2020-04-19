class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
  }
  render() {
    const el = document.createElement(this.tagName)
    const props = this.props

    for (const propName in props) {
      if (props.hasOwnProperty(propName)) {
        const propValue = props[propName]
        el.setAttribute(propName, propValue)
      }
    }

    const children = this.children || []

    children.forEach(child => {
      const childEle =
        child instanceof Element
          ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
          : document.createTextNode(child) // 如果字符串，只构建文本节点
      el.appendChild(childEle)
    })
    return el
  }
}

export default function (tagName, props, children) {
  return new Element(tagName, props, children)
}
