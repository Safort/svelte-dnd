<script>
	import { onMount, createEventDispatcher, setContext } from 'svelte';
	import { get } from 'svelte/store';
	import {
		activeDropZoneStore,
		dropZoneListStore,
		lastDropStore,
		dropFromStore,
		addDropZone,
		currentComponentStore,
		currentPropsStore,
	} from './stores';
	import { onmouseup } from './lib';

	export let id;
	export let classes;

	if (!id) {
		throw Error(`'id' is empty`);
	}

	const dispatch = createEventDispatcher();
	let isCurrent = false;

	onMount(() => {
		addDropZone(id);
	});

	activeDropZoneStore.subscribe(value => {
		if (value === id) {
			if (!isCurrent) {
				dispatch('dragover', { dropZoneId: id });
				isCurrent = true;
			}
	  } else {
			if (isCurrent) {
				dispatch('dragout', { dropZoneId: id });
				isCurrent = false;
			}
	  }
	});
	
	lastDropStore.subscribe(dzId => {
		if (dzId === id) {
			dispatch('drop', {
				to: id,
				from: get(dropFromStore),
				item: {
					component: get(currentComponentStore),
					props: get(currentPropsStore),
				}
			});
	  }
	});

</script>

<div class={classes} dropzone-id={id}>
	<slot></slot>
</div>
