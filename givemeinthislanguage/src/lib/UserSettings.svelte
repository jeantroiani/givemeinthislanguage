<script lang="ts">
  import { Select, Toggle, Label, P } from 'flowbite-svelte';
  import { Languages } from "../wordsToNumbers/languagesMap";
  import { lessons, LessonTypes } from '../variables/lessons';

  let {is24HourFormat, selectedLanguage, handleLanguageChange, toggleTimeFormat, selectedLesson} = $props()


  const languagesOptions = Object.values(Languages).map(language => ({
    value: language,
    name: capitalize(language)
  }));

  const lessonsOptions = Object.values(lessons).map(lesson => ({
    value: lesson.title,
    name: capitalize(lesson.title)
  }));

  function handleSelectLesson(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    selectedLesson = selectElement.value as LessonTypes;
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<div>
  <Label class="mt-4">
    Practice Language:
    <Select class="mt-2" items={languagesOptions} bind:value={selectedLanguage} on:change={handleLanguageChange} />
  </Label>
  
  <Label class="mt-4">
    Practice Lesson:
    <Select class="mt-2" items={lessonsOptions} bind:value={selectedLesson} on:change={handleSelectLesson} />
  </Label>
  
  <Label class="mt-4">
    Time Format:
    <Toggle class='mt-2' onclick={toggleTimeFormat} checked={is24HourFormat}> 24 Hour Format</Toggle>
  </Label>
</div>

<style>
  div {
    padding: 24px;
  }
</style>