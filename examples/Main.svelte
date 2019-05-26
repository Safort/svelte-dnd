<script>
  import { onMount } from 'svelte';
  import { Context, Draggable, DropZone } from '../build/index.mjs';
  import Item from './Item.svelte';

  let dz1Active = false;
  let dz2Active = false;

  function onDrop(data) {
    console.log('Main onDrop', data.detail)
  }

  function onDragOver(data) {
    if (data.detail.dropZoneId === 'DZ-1') {
      dz1Active = true;
    }
    if (data.detail.dropZoneId === 'DZ-2') {
      dz2Active = true;
    }
  }

  function onDragOut(data) {
    if (data.detail.dropZoneId === 'DZ-1') {
      dz1Active = false;
    }
    if (data.detail.dropZoneId === 'DZ-2') {
      dz2Active = false;
    }
  }

  $: dz1 = `dropzone${dz1Active ? ' active' : ''}`;
  $: dz2 = `dropzone${dz2Active ? ' active' : ''}`;
</script>

<style>
  div {
    background: #eee;
    color: red;
    display: inline-block;
    margin: 2px;
    padding: 20px;
  }

  :global(.dropzone) {
    border: 1px solid red;
    padding: 30px;
		display: inline-block;
		margin: 0 10px;
  }
  :global(.active) {
    background: #777;
  }
</style>

<div>
  <Context>
    <DropZone classes={dz1} on:drop={onDrop} on:dragover={onDragOver} on:dragout={onDragOut} id="DZ-1">
      <Draggable component={Item} props={{name: 'One'}} />
      <Draggable component={Item} props={{name: 'Two'}} />
    </DropZone>
    <DropZone classes={dz2} on:drop={onDrop} on:dragover={onDragOver} on:dragout={onDragOut} id="DZ-2">
      <Draggable component={Item} props={{name: 'Three'}} />
      <Draggable component={Item} props={{name: 'Four'}} />
    </DropZone>
  </Context>
</div>