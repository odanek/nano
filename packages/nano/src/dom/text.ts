export type TextProps = string;
export type TextStateNode = Text;

export function createTextInstance(text: string): TextStateNode {
  return document.createTextNode(text);
}

export function updateTextInstance(
  node: TextStateNode,
  text: string,
  previousText: string,
): void {
  if (text !== previousText) {
    node.nodeValue = text;
  }
}

export function resetTextContent(node: Node): void {
  setTextContent(node, '');
}

export function setTextContent(node: Node, text: string): void {
  if (text.length > 0) {
    const firstChild = node.firstChild;
    if (
      firstChild &&
      firstChild === node.lastChild &&
      firstChild.nodeType === 3
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
