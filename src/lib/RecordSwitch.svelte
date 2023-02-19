<script>
  export let recording = false;
  export let toogle = () => {
    recording = !recording;
  };
</script>

<div class="container">
  <div class="ring" on:click={toogle} on:keydown={toogle} class:recording>
    <div class="innerdiv" class:recording />
  </div>
</div>

<style>
  .innerdiv {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    background-color: red;
    transition: border-radius 0.3s ease-in-out;
  }
  .innerdiv.recording {
    border-radius: 10%;
    animation: scaleWaves 1s ease infinite;
  }
  .ring {
    padding: 1rem;
    border: 1rem;
    border: solid 0.5rem red;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    cursor: pointer;
    margin: 2rem;
  }
  .ring.recording {
    animation: waves 1s ease infinite;
  }
  @keyframes waves {
    0% {
      border: solid 0.5rem red;
    }
    50% {
      border: solid 2rem rgba(255, 0, 0, 0);
    }
    51% {
      border: solid 0.1rem rgba(255, 0, 0, 0);
    }
    75% {
      border: solid 0.5rem red;
    }
    100% {
      border: solid 0.5rem red;
    }
  }
  @keyframes scaleWaves {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  .container {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 13rem;
  }
</style>
