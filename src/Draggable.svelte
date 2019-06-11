<script>
  export let component;
  export let props = {};

  import { get } from 'svelte/store';
  import { onmousedown, onmouseup } from './lib';

  const onMouseDown = (event) => {
    if (event.which !== 1) {
      return;
    }
    onmousedown(event, component, props);
  }

  const onMouseUp = (event) => {
    event.stopPropagation();
    onmouseup(event, component, props);
  }
</script>

<div on:mousedown={onMouseDown} on:mouseup={onMouseUp}>
  <svelte:component this={component} {...props} />
</div>
