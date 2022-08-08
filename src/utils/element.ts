export type Dimension = { width: number; height: number };

const Unit = {
  px: 'px',
  percent: '%',
} as const;

function getDimension(element: HTMLElement): Dimension {
  return {
    width: parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', '')),
    height: parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', '')),
  };
}

export type Position = { x: number; y: number };

function getPosition(element: HTMLElement): Position {
  return { x: element.getBoundingClientRect().left, y: element.getBoundingClientRect().top };
}

function joinValue(value: number, unit: keyof typeof Unit) {
  return `${value}${unit}`;
}

function getMaxDimension(collection: HTMLCollection): Dimension {
  let maxWidth = 0;
  let maxHeight = 0;
  const ignoreIds = ['box-placeholder'];
  for (let i = 0; i < collection.length; i++) {
    const element = collection[i];
    if (!ignoreIds.find((id) => id === element.id)) {
      if (maxWidth < element.clientWidth) {
        maxWidth = element.clientWidth;
      }
      if (maxHeight < element.clientHeight) {
        maxHeight = element.clientHeight;
      }
    }
  }
  return { width: maxWidth, height: maxHeight };
}

export default { getDimension, getPosition, joinValue, Unit, getMaxDimension };
