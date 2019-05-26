<script>
	import { onmouseup } from './lib';
</script>
  
<svelte:window on:mouseup={onmouseup} />

<slot></slot>
