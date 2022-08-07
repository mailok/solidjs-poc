import { onCleanup } from 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      // use:clickOutside
      clickOutside: any;
    }
  }
}

export default function clickOutside(el: HTMLElement, accessor: any) {
  const onClick = (e) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener('click', onClick);

  onCleanup(() => document.body.removeEventListener('click', onClick));
}
