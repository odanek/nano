import { useContext } from '@nano-ui/nano';
import { ActionDispatcher, DispatchContext } from '../logic/action';

export function useActionDispatch(): ActionDispatcher {
  return useContext(DispatchContext);
}
