import type { Component } from 'solid-js';
import clickOutsideDirective from './directives/click-outside';
import draggableDirective from './directives/draggable';
import resizableDirective from './directives/resizable';
const clickOutside = clickOutsideDirective;
const draggable = draggableDirective;
const resizable = resizableDirective;

import { WithChildren } from './utils/types';
import { createSignal, Show } from 'solid-js';
import { twMerge } from 'tailwind-merge';

function TestButton() {
  return (
    <button
      type="button"
      class="absolute inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      Button
    </button>
  );
}

const App: Component = () => {
  return (
    <div class="w-full h-[100vh] p-3">
      <Editor>
        <Box>
          <TestButton />
        </Box>
      </Editor>
    </div>
  );
};
// ={{ enabled: active(), onResize: (dimensions) => console.log(dimensions) }}
function Box(props: WithChildren) {
  const [active, setActive] = createSignal(false);

  return (
    <div
      onclick={() => setActive(true)}
      use:resizable
      use:clickOutside={() => setActive(false)}
      class={twMerge(
        'w-[300px] h-[200px] relative cursor-move absolute box-border border',
        active() ? 'border border-blue-600' : undefined,
        !active() ? 'hover:border hover:border-dashed hover:border-blue-300 hover:bg-blue-50' : undefined,
      )}
    >
      {props.children}
      <Show when={!active()}>
        <span
          id="box-placeholder"
          class="text-xs text-slate-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          Drag content here
        </span>
      </Show>
    </div>
  );
}

function Editor(props: WithChildren) {
  return (
    <section class="w-[60%] h-[600px] border border-orange-600 border-dotted absolute p-10">{props.children}</section>
  );
}

export default App;
