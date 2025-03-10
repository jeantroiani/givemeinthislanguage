<script lang="ts">
  import languages, { languagesCoversionFunctionMap, languagesMap, type LanguageSet } from "../wordsToNumbers/languagesMap";

  type LanguagesMapType = {
    [key: string]: LanguageSet;
  };

  const typedLanguagesMap: LanguagesMapType = languagesMap;



  let is24HourFormat: boolean = true;
  let randomTime: string = ''
  let userInput: string = '';
  let result : boolean  = false;

  let language: languages = languages.english;

  function handleLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    language = selectElement.value as languages;
  }
  
  function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
  }
  
  function getRandomTime(is24HourFormat: boolean): string {
    const hours = Math.floor(Math.random() * (is24HourFormat ? 24 : 12));
    const minutes = Math.floor(Math.random() * 60);
    const formattedHours = is24HourFormat ? hours : (hours === 0 ? 12 : hours);
    const period = !is24HourFormat ? (hours < 12 ? 'AM' : 'PM') : '';
    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`.trim();
  }



  function validateInput() {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(userInput)) {
    const userTime = languagesCoversionFunctionMap[language](userInput)
    }
  }


  function handleSubmit(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
    const userTime = languagesCoversionFunctionMap[language](userInput);
    result = userTime === randomTime;
  }
</script>

<select bind:value={language} onchange={handleLanguageChange}>
  <option value={languages.english}>{languages.english.toUpperCase()}</option>
  <option value={languages.japanese}>{languages.japanese.toUpperCase()}</option>
</select>

<p>The random time is: {randomTime}</p>

<button onclick={toggleTimeFormat}>
 {is24HourFormat ? '24' : '12'} Hour Format
</button>
<button onclick={() => { randomTime = getRandomTime(is24HourFormat); }}>Get Random Time</button>
<input type="text" bind:value={userInput} placeholder="Enter text" oninput={validateInput} />
<button onclick={handleSubmit}>Submit</button>

<p>Your answer is: {result ? 'correct' : 'incorrect'}</p>

