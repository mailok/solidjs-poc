import type { Component } from 'solid-js';
import clickOutsideDirective from './directives/click-outside';

const clickOutside = clickOutsideDirective;
import { WithChildren } from './utils/types';
import { createSignal, Show } from 'solid-js';
import { twMerge } from 'tailwind-merge';

const App: Component = () => {
  return (
    <div class="w-full h-[100vh] p-3">
      <Editor>
        <Box />
      </Editor>
    </div>
  );
};

function Box(props: WithChildren) {
  const [active, setActive] = createSignal(true);

  return (
    <div
      onclick={() => setActive(true)}
      use:clickOutside={() => {
        return setActive(false);
      }}
      class={twMerge(
        'w-[300px] h-[200px] bg-softWhite relative cursor-move absolute',
        active() ? 'border border-blue-600' : undefined,
      )}
    >
      {props.children}
      <span class="text-xs text-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Drag content here
      </span>
      <Show when={active()}>
        <ResizeBullet direction={'top'} />
        <ResizeBullet direction={'right'} />
        <ResizeBullet direction={'left'} />
        <ResizeBullet direction={'bottom'} />
        <ResizeBullet direction={'top-left'} />
        <ResizeBullet direction={'top-right'} />
        <ResizeBullet direction={'bottom-right'} />
        <ResizeBullet direction={'bottom-left'} />
      </Show>
    </div>
  );
}

function ResizeBullet(props: {
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
}) {
  const cursor = {
    left: 'cursor-ew-resize',
    right: 'cursor-ew-resize',
    top: 'cursor-ns-resize',
    bottom: 'cursor-ns-resize',
    'top-left': 'cursor-nwse-resize',
    'top-right': 'cursor-nesw-resize',
    'bottom-right': 'cursor-nwse-resize',
    'bottom-left': 'cursor-nesw-resize',
  };
  const position = {
    left: 'after:ml-[-4px] after:left-[0%] after:top-[50%]',
    right: 'after:mr-[-4px] after:right-[0%] after:top-[50%]',
    top: 'after:mt-[-4px] after:right-[50%] after:top-[0%]',
    bottom: 'after:mb-[-4px] after:right-[50%] after:bottom-[0%]',
    'top-left': 'after:mt-[-3px] after:ml-[-3px] after:left-[0%] after:top-[0%]',
    'top-right': 'after:mt-[-3px] after:mr-[-3px] after:right-[0%] after:top-[0%]',
    'bottom-right': 'after:mb-[-3px] after:mr-[-3px] after:right-[0%] after:bottom-[0%]',
    'bottom-left': 'after:mb-[-3px] after:ml-[-3px] after:left-[0%] after:bottom-[0%]',
  };

  return (
    <span
      class={twMerge(
        "after:content-[''] after:w-[7px] after:h-[7px] after:bg-white after:border after:border-solid after:border-blue-600 after:rounded-[50%] after:absolute",
        cursor[props.direction],
        position[props.direction],
      )}
    />
  );
}

function Editor(props: WithChildren) {
  return (
    <section class="w-[70%] h-[100%] border border-orange-200 border-dashed absolute p-10">{props.children}</section>
  );
}

export default App;
