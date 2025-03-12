
<script lang="ts">
    import languages from "../wordsToNumbers/languagesMap";
    import PracticeTime from "./PracticeTime.svelte";
    import UserSettings from './UserSettings.svelte';

    let language: languages = languages.English;
   let is24HourFormat: boolean = true;

    function handleLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    language = selectElement.value as languages;
  }
  function toggleTimeFormat() {
        is24HourFormat = !is24HourFormat;
    }
  </script>
  
  <div style="display: flex; width: auto; flex-direction: row; height: 100%;">
      <UserSettings toggleTimeFormat={toggleTimeFormat} language={language} is24HourFormat={is24HourFormat} handleLanguageChange={handleLanguageChange}/>
      <PracticeTime language={language} is24HourFormat={is24HourFormat}/>
  </div>