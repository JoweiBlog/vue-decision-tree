let nodeId = 0;
const NODE_KEY = "$nodeKey";

export default class nodeModel {
  constructor(options) {
    this.id = nodeId++;
    this.data = options.data || null;
    this.props = options.props || {};
    this.parent = options.parent || null;
    this.level = 0;
    this.childNodes = [];

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    if (this.data) {
      if (!Array.isArray(this.data)) {
        this.markData(this.data);
      }

      this.appendChild(this.data, this.props);
    }
  }

  get key() {
    if (this.data) return this.data[NODE_KEY];
    return null;
  }

  get label() {
    return this.data[[this.props["label"] || "label"]] || "";
  }

  get isLeaf() {
    return !(this.childNodes || []).length;
  }

  get noSiblings() {
    return ((this.parent || {}).childNodes || []).length === 1;
  }

  markData(data) {
    if (!data || data[NODE_KEY]) return;
    Object.defineProperty(data, NODE_KEY, {
      value: this.id,
      enumerable: false,
      configurable: false,
      writable: false
    });
  }

  appendChild(data, props) {
    let children =
      data instanceof Array
        ? data
        : data[[props["children"] || "children"]] || [];

    for (let i = 0, j = children.length; i < j; i++) {
      this.childNodes.push(
        new nodeModel({
          data: children[i],
          props,
          parent: this
        })
      );
    }
  }
}
