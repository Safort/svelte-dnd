<script>
  export let name;
  export let onClick = () => {};
</script>

<style>
  div {
    background: #aaa;
    color: #333;
    display: inline-block;
    margin: 2px;
    padding: 20px;
  }
</style>
  
<div on:click={onClick}>
  Item: {name}
</div>