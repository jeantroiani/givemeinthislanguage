<script lang="ts">
  import { LessonTypes } from "../variables/lessons";
  import languages from "../wordsToNumbers/languagesMap";
  import NavBar from "./components/NavBar.svelte";
  import PracticeTime from "./practiceTime.svelte";

  let language: languages = $state(languages.English);
  let is24HourFormat: boolean = $state(false);
  let selectedLesson: LessonTypes = LessonTypes.Time;

  function handleLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    language = selectElement.value as languages;
  }

  function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
  }
</script>

<div class="container">
  <div class="header">
    <NavBar
      {toggleTimeFormat}
      selectedLanguage={language}
      {is24HourFormat}
      {handleLanguageChange}
      {selectedLesson}
    />
      <PracticeTime selectedLanguage={language} {is24HourFormat} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 100%;
  }
  .header {
    /* background-color: rgb(142, 180, 189); */
  }
</style>
