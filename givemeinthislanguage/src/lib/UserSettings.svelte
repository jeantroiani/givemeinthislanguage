
<script lang="ts">
  import languages from "../wordsToNumbers/languagesMap";
  let {language, handleLanguageChange, is24HourFormat, toggleTimeFormat} = $props();

</script>

<div style="flex: 1 auto 320px; display: flex; width: 320px; flex-direction: column; border-right: 1px solid grey; padding: 0 24px;">
    <p style="padding: 6px; margin-bottom: 24px">Preferences:</p>
        <select style="margin-bottom: 24px" bind:value={language} onchange={handleLanguageChange}>
          <option value={languages.English}>{languages.English.toUpperCase()}</option>
          <option value={languages.Japanese}>{languages.Japanese.toUpperCase()}</option>
        </select>
      
        <button onclick={toggleTimeFormat} class="btn preset-filled-surface-500">
          {is24HourFormat ? '24' : '12'} Hour Format
        </button>
</div>

<style>
    div {
        border-right: 1px solid grey;
        padding: 0 24px;
        flex: 1 auto 320px; display: flex; width: 320px; flex-direction: column; border-right: 1px solid grey; padding: 0 24px;
    }
</style>