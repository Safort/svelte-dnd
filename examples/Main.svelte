<script>
  import { onMount } from 'svelte';
  import { Context, Draggable, DropZone } from '../lib/cjs';
  import Item from './Item.svelte';

  $: dropZones = {
    DZ1: {
      items: [{ name: 'Item 1' }, { name: 'Item 2' }],
      isActive: false,
    },
    DZ2: {
      items: [{ name: 'Item 3' }, { name: 'Item 4' }],
      isActive: false,
    },
    DZ3: {
      items: [{ name: 'Item 5' }, { name: 'Item 6' }],
      isActive: false,
    },
  };

  function onDrop({ detail }) {
    console.log('onDrop', detail)
    const item = detail.item;
    const newDZList = { ...dropZones };

    newDZList[detail.to].items.push(item.props);
    newDZList[detail.from].items = newDZList[detail.from].items.filter(i => i.name !== item.props.name);

    dropZones = newDZList;
  }

  function onDragOver(data) {
    const newDZ = { ...dropZones };

    newDZ[data.detail.dropZoneId].isActive = true;
    dropZones = newDZ;
  }

  function onDragOut(data) {
    const newDZ = { ...dropZones };

    newDZ[data.detail.dropZoneId].isActive = false;
    dropZones = newDZ;
  }
</script>

<style>
  div {
    background: #eee;
    color: red;
    display: flex;
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
    {#each Object.keys(dropZones) as dz}
      <DropZone
        classes={`dropzone${dropZones[dz].isActive ? ' active' : ''}`}
        on:drop={onDrop}
        on:dragover={onDragOver}
        on:dragout={onDragOut}
        id={dz}
      >
        {#each dropZones[dz].items as itemProps}
          <Draggable component={Item} props={itemProps} />
        {/each}
      </DropZone>
    {/each}
  </Context>
</div>
