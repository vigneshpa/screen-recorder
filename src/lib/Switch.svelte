<script>
  export let value = false;
  let id = Math.trunc(Math.random() * 1000) + '-switch';
</script>

<div class="container">
  <label class="switch"
    ><input type="checkbox" {id} bind:checked={value} />
    <div class="but" />
  </label>
  <label for={id} class="txt"><slot /></label>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.3rem;
  }
  .switch input {
    position: absolute;
    opacity: 0;
  }
  .switch {
    display: inline-block;
    font-size: 20px; /* 1 */
    height: 1rem;
    width: 2rem;
    background: #bdb9a6;
    border-radius: 1rem;
    padding: 2px;
    margin: 0.2rem;
  }
  .switch .but {
    height: 1rem;
    width: 1rem;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
    transition: all 300ms;
  }
  .switch input:checked + .but {
    transform: translate3d(100%, 0, 0);
    background-color: #1f49a3;
    box-shadow: 0 0 5px grey;
  }
  .txt {
    margin: 0.2rem;
  }
</style>
