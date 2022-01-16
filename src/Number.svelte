<script>
  export let name = 'default';
  export let value = parseInt(localStorage.getItem('number-' + name)) || 0;
  $: {
    value = Math.trunc(value);
    if (value < min) value = min;
    localStorage.setItem('number-' + name, value);
  }
  export let min = 0;
  let id = Math.floor(Math.random() * 1000) + '-number';
</script>

<div class="container">
  <label for={id}>
    <slot />
  </label>
  <button class="dec" on:click={() => value--}>-</button>
  <input type="number" {id} bind:value {min} />
  <button class="inc" on:click={() => value++}>+</button>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    width: 2rem;
    height: 100%;
    padding: 0.5rem;
    margin: 0;
    border-radius: 0;
    line-height: 1rem;
    border: none;
    transition: background-color 0.3s ease;
    background-color: rgb(214, 214, 214);
  }
  button:hover {
    background-color: rgb(155, 155, 155);
  }
  button:active {
    background-color: rgb(102, 102, 102);
  }
  input {
    width: 3rem;
    border: none;
    height: 1rem;
    padding: 0.5rem;
    margin: 0;
    line-height: 1rem;
    text-align: center;
    background-color: rgb(214, 214, 214);
  }
  label {
    margin: 1rem;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
