<script lang="ts">
  import Application from './lib/Application.svelte';
  import {  P } from 'flowbite-svelte';

</script>

<main>
  <P size="4xl">Dimelo</P>
  
  <div class="card">
      <Application />
  </div>

</main>

<style>
  main {
    display: flex; height: 100%; flex-direction: column
  }
</style>