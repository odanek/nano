import { render } from '@nano-ui/nano';
import { TodoApp } from './app';

window.addEventListener('DOMContentLoaded', () => {
  render(<TodoApp />, document.body);
});
