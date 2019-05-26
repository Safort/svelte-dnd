import { get } from 'svelte/store';
import {
  isMouseDownStore,
  currentDraggableStore,
  currentComponentStore,
  currentPropsStore,
  currentDummyStore,
  shiftXStore, shiftYStore,
  currentStylesStore,
  dropFromStore,
  activeDropZoneStore,
  lastDropStore,
} from './stores';

let isMouseDown = false;
let currentDraggable = null;
let shiftY = 0;
let shiftX = 0;
let startedCoordX = 0;
let startedCoordY = 0;
let MIN_MOVE_DISTANCE = 3;

currentDraggableStore.subscribe(value => {
  currentDraggable = value;
});
isMouseDownStore.subscribe(value => {
  isMouseDown = value;
});
shiftXStore.subscribe(value => {
  shiftX = value;
});
shiftYStore.subscribe(value => {
  shiftY = value;
});


export function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

export function getDropZone(drag, event) {
  const displayStyle = window.getComputedStyle(drag).display;

  drag.style.display = 'none';

  const elem = document.elementFromPoint(event.clientX, event.clientY);

  drag.style.display = displayStyle;

  if (elem == null) {
    return null;
  }
  return elem.closest('[dropzone-id]');
}

export function onmousedown(event, component, props) {
  currentComponentStore.set(component);
  currentPropsStore.set(props);
  isMouseDownStore.set(true);
  currentDraggableStore.set(event.target);

  const current = get(currentDraggableStore);

  if (current) {
    window.addEventListener('mousemove', onmousemove);
    currentDummyStore.set(current.cloneNode(true));
    const rect = getCoords(current);
    startedCoordY = event.pageY;
    startedCoordX = event.pageX;
    shiftYStore.set(event.pageY - rect.top);
    shiftXStore.set(event.pageX - rect.left);

    currentStylesStore.set({
      position: current.style.position,
      top: current.style.top,
      left: current.style.left,
    });
    current.style.position = 'fixed';
    current.after(get(currentDummyStore));
  
    const dropZone = getDropZone(current, event);
    dropZone && dropFromStore.set(dropZone.getAttribute('dropzone-id'))
  }
}

export function onmouseup(event) {
  window.removeEventListener('mousemove', onmousemove);
  const dummy = get(currentDummyStore);
  const current = get(currentDraggableStore);
  const currentStyles = get(currentStylesStore);

  isMouseDownStore.set(false);
  dummy && dummy.remove();
  currentDummyStore.set(null);

  if (!current) {
    return;
  }

  current.style.position = currentStyles.position;
  current.style.top = currentStyles.top;
  current.style.left = currentStyles.left;
  shiftYStore.set(0);
  shiftXStore.set(0);

  const droppZone = getDropZone(current, event);
  const dropapbleId = droppZone && droppZone.getAttribute('dropzone-id');

  lastDropStore.set(dropapbleId);

  clearDragData();
}

function isFarEnouth(event) {
  const diffY = Math.abs(event.pageY - startedCoordY);
  const diffX = Math.abs(event.pageX - startedCoordX);

  return diffX > MIN_MOVE_DISTANCE || diffY > MIN_MOVE_DISTANCE;
}

export function onmousemove(event) {
  if (isMouseDown && currentDraggable && isFarEnouth(event)) {
    currentDraggable.style.top = event.pageY - shiftY + 'px';
    currentDraggable.style.left = event.pageX - shiftX + 'px';

    const droppZone = getDropZone(currentDraggable, event);
    const dropapbleId = droppZone && droppZone.getAttribute('dropzone-id');
    if (dropapbleId !== get(activeDropZoneStore)) {
      activeDropZoneStore.set(dropapbleId);
    }
  }
}


export function clearDragData() {
  activeDropZoneStore.set('');
  startedCoordX = 0;
  startedCoordY = 0;
}
