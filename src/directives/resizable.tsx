import type { Accessor } from 'solid-js';
import { createRenderEffect, onMount } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { render } from 'solid-js/web';
import Element, { Dimension, Position } from '../utils/element';
import Mouse from '../utils/mouse';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      resizable: true | Partial<ResizableAccessor>;
    }
  }
}

type ResizableAccessor = {
  enabled: boolean;
  minWidth: number;
  minHeight: number;
  onResize: (dimensions: { width: number; height: number }) => void;
};

const ResizablePosition = {
  top: 'top',
  right: 'right',
  left: 'left',
  bottom: 'bottom',
  'top-left': 'top-left',
  'top-right': 'top-right',
  'bottom-right': 'bottom-right',
  'bottom-left': 'bottom-left',
} as const;

export default function resizable(element: HTMLElement, accessor: Accessor<Partial<ResizableAccessor> | true>) {
  createRenderEffect(() => {
    const props = accessor();

    let options: Partial<ResizableAccessor> = { enabled: true, minHeight: 50, minWidth: 50 };

    if (typeof props !== 'boolean') {
      options = { ...options, ...props };
    }
    if (options.enabled) {
      render(
        () => (
          <>
            <ResizeBullet direction={ResizablePosition.top} />
            <ResizeBullet direction={ResizablePosition.right} />
            <ResizeBullet direction={ResizablePosition.left} />
            <ResizeBullet direction={ResizablePosition.bottom} />
            <ResizeBullet direction={ResizablePosition['top-left']} />
            <ResizeBullet direction={ResizablePosition['top-right']} />
            <ResizeBullet direction={ResizablePosition['bottom-right']} />
            <ResizeBullet direction={ResizablePosition['bottom-left']} />
          </>
        ),
        element,
      );

      onMount(() => {
        const bullets = element.querySelectorAll(`[id$="bullet"]`); // TODO fix ignore children

        // Taken algorithm from https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
        let elementDimension: Dimension = { height: 0, width: 0 };
        let childrenDimension: Dimension = { height: 0, width: 0 };
        let elementPosition: Position = { x: 0, y: 0 };
        let mousePosition = { x: 0, y: 0 };

        for (let i = 0; i < bullets.length; i++) {
          const currentBullet = bullets[i];
          currentBullet.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();
            elementDimension = Element.getDimension(element);
            elementPosition = Element.getPosition(element);
            childrenDimension = Element.getMaxDimension(element.children); // TODO add height limitations
            mousePosition = Mouse.getPosition(event);

            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
          });
          let width;
          let height;

          function resize(e) {
            switch (currentBullet.id) {
              case 'left-bullet':
                width = elementDimension.width - (e.pageX - mousePosition.x);
                if (width >= options.minWidth && width >= childrenDimension.width) {
                  element.style.width = Element.joinValue(width, Element.Unit.px);
                  element.style.left = Element.joinValue(
                    elementPosition.x + (e.pageX - mousePosition.x),
                    Element.Unit.px,
                  );
                }
                break;
              case 'right-bullet':
                width = elementDimension.width + (e.pageX - mousePosition.x);
                if (width >= options.minWidth && width >= childrenDimension.width) {
                  element.style.width = Element.joinValue(width, Element.Unit.px);
                }
                break;
              case 'top-bullet':
                height = elementDimension.height - (e.pageY - mousePosition.y);
                if (height >= options.minHeight) {
                  element.style.height = Element.joinValue(height, Element.Unit.px);
                  element.style.top = Element.joinValue(
                    elementPosition.y + (e.pageY - mousePosition.y),
                    Element.Unit.px,
                  );
                }
                break;
              case 'bottom-bullet':
                height = elementDimension.height + (e.pageY - mousePosition.y);
                if (height >= options.minHeight) {
                  element.style.height = Element.joinValue(height, Element.Unit.px);
                }
                break;
              case 'bottom-right-bullet':
                width = elementDimension.width + (e.pageX - mousePosition.x);
                height = elementDimension.height + (e.pageY - mousePosition.y);
                if (width >= options.minWidth && width >= childrenDimension.width) {
                  element.style.width = Element.joinValue(width, Element.Unit.px);
                }
                if (height >= options.minHeight) {
                  element.style.height = Element.joinValue(height, Element.Unit.px);
                }
                break;
              case 'bottom-left-bullet':
                height = elementDimension.height + (e.pageY - mousePosition.y);
                width = elementDimension.width - (e.pageX - mousePosition.x);
                if (height >= options.minHeight) {
                  element.style.height = Element.joinValue(height, Element.Unit.px);
                }
                if (width >= options.minWidth) {
                  element.style.width = Element.joinValue(width, Element.Unit.px);
                  element.style.left = Element.joinValue(
                    elementPosition.x + (e.pageX - mousePosition.x),
                    Element.Unit.px,
                  );
                }
                break;
              case 'top-right-bullet':
                width = elementDimension.width + (e.pageX - mousePosition.x);
                height = elementDimension.height - (e.pageY - mousePosition.y);
                if (width >= options.minWidth && width >= childrenDimension.width) {
                  element.style.width = Element.joinValue(width, Element.Unit.px);
                }
                if (height >= options.minHeight) {
                  element.style.height = Element.joinValue(height, Element.Unit.px);
                  element.style.top = Element.joinValue(
                    elementPosition.y + (e.pageY - mousePosition.y),
                    Element.Unit.px,
                  );
                }
                break;
              case 'top-left-bullet':
                width = elementDimension.width - (e.pageX - mousePosition.x);
                height = elementDimension.height - (e.pageY - mousePosition.y);
                if (width >= options.minWidth && width >= childrenDimension.width) {
                  element.style.width = Element.joinValue(width, Element.Unit.px);
                  element.style.left = Element.joinValue(
                    elementPosition.x + (e.pageX - mousePosition.x),
                    Element.Unit.px,
                  );
                }
                if (height >= options.minHeight) {
                  element.style.height = Element.joinValue(height, Element.Unit.px);
                  element.style.top = Element.joinValue(
                    elementPosition.y + (e.pageY - mousePosition.y),
                    Element.Unit.px,
                  );
                }
                break;
            }
            options?.onResize?.({ width: element.clientWidth, height: element.clientHeight });
          }
          function stopResize() {
            window.removeEventListener('mousemove', resize);
          }
        }
      });
    } else {
      try {
        const bullets = element.querySelectorAll(`[id$="bullet"]`);
        for (const bullet of bullets) {
          bullet.remove();
        }
      } catch (e) {}
    }
  });
}

function ResizeBullet(props: { direction?: keyof typeof ResizablePosition }) {
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
      id={`${props.direction}-bullet`}
      class={twMerge(
        "after:content-[''] after:w-[7px] after:h-[7px] after:bg-white after:border after:border-solid after:border-blue-600 after:rounded-[50%] after:absolute",
        cursor[props.direction],
        position[props.direction],
      )}
    />
  );
}
