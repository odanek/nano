export type NanoHostTextStateNode = Text;

export function createHostTextInstance(text: string): NanoHostTextStateNode {
  return document.createTextNode(text);
}

export function updateHostTextInstance(
  node: NanoHostTextStateNode,
  text: string,
  previousText: string,
) {
  if (text !== previousText) {
    node.nodeValue = text;
  }
}

export function resetHostTextContent(node: NanoHostTextStateNode) {
  setHostTextContent(node, '');
}

export function setHostTextContent(node: Node, text: string) {
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
