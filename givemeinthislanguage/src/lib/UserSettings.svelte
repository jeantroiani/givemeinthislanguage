<script lang="ts">
  import { Select, Toggle, Label } from 'flowbite-svelte';
  import { Languages } from "../wordsToNumbers/languagesMap";

  export let language: string;
  export let handleLanguageChange: (event: Event) => void;
  export let is24HourFormat: boolean;
  export let toggleTimeFormat: () => void;

  const languagesOptions = Object.values(Languages).map((language) => ({
    value: language,
    name: language.charAt(0).toUpperCase() + language.slice(1)
  }));
</script>

<div>
  <p class="preferences-title">Preferences:</p>
  <Label>
    Select Language:
    <Select class="mt-2" items={languagesOptions} bind:value={language} on:change={handleLanguageChange} />
  </Label>
  <Toggle onclick={toggleTimeFormat} checked={is24HourFormat}> 24 Hour Format</Toggle>
</div>

<style>
  div {
    padding: 24px;
  }
  .preferences-title {
    padding: 6px;
    margin-bottom: 24px;
  }
</style>