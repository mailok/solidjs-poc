export type MousePosition = { x: number; y: number };

function getPosition(event: MouseEvent): MousePosition {
  return { x: event.pageX, y: event.pageY };
}

export default { getPosition };
