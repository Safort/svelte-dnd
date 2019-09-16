import { writable } from 'svelte/store';
import { get } from 'svelte/store';


export let activeDropZoneStore = writable('');
export let dropZoneListStore = writable([]);
export let lastDropStore = writable('');

export let currentDraggableStore = writable(null);
export let cloneStore = writable(null);
export let currentStylesStore = writable({});
export let currentComponentStore = writable(null);
export let currentPropsStore = writable({});

export let shiftXStore = writable(0);
export let shiftYStore = writable(0);

export let isMouseDownStore = writable(false);

export let dropFromStore = writable('');

export function addDropZone(id) {
  const list = [...get(dropZoneListStore)];

  if (list.includes(id)) {
    console.warn(`id "${id}" already exist`);
  }
  list.push(id);
  dropZoneListStore.set(list);
}