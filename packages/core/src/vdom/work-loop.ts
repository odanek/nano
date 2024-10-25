import { NanoFiberRoot } from './fiber-root';

export function performSyncWorkOnRoot(root: NanoFiberRoot) {
  console.log(root);
}
