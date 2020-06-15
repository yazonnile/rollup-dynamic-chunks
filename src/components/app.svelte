<script>
  import resolver from 'libs/resolver.js';

  let activeView = 'home';

  const setView = ({ target }) => {
    activeView = target.innerText;
  };
</script>

<button on:click={setView} disabled={activeView === 'home'}>home</button>
<button on:click={setView} disabled={activeView === 'feeds'}>feeds</button>
<button on:click={setView} disabled={activeView === 'contacts'}>contacts</button>

<h1>Current page is...</h1>
{#await resolver(activeView) then component}
  <svelte:component this={component} />
{/await}

