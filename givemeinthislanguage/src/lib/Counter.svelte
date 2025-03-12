<script lang="ts">
  import languages, { languagesCoversionFunctionMap } from "../wordsToNumbers/languagesMap";
  import { MIDNIGHT } from "../wordsToNumbers/variables";

  let is24HourFormat: boolean = true;
  let randomTime: string = MIDNIGHT;
  let userInput: string = '';
  let result : boolean | null = null;
  let currentStreak: number = 0;
  let fails: number = 0;

  let language: languages = languages.english;

  function handleLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    language = selectElement.value as languages;
  }
  
  function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
  }
  
  function getRandomTime(): string {
    const hours = Math.floor(Math.random() * (is24HourFormat ? 24 : 12));
    const minutes = Math.floor(Math.random() * 60);
    const formattedHours = is24HourFormat ? hours : (hours === 0 ? 12 : hours);
    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`.trim();
  }

  function convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const formattedHours = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  function generateRandomTime() {
    randomTime = getRandomTime();
  }


  function handleSubmit() {
    const userTime = languagesCoversionFunctionMap[language](userInput.trim());
    const randomTimeConverted = randomTime === MIDNIGHT ? randomTime : convertTo12HourFormat(randomTime);
    result = userTime === randomTimeConverted;
    if (result) {
      currentStreak += 1;
      generateRandomTime()
    } else {
      fails += 1;
    }
  }
   const onKeyPress = (e: KeyboardEvent) => {
          const regex = /^[a-zA-Z-' ]*$/;
          if (!regex.test(e.key)) {
            e.preventDefault();
          }
  };
</script>

<div>

<select bind:value={language} onchange={handleLanguageChange}>
  <option value={languages.english}>{languages.english.toUpperCase()}</option>
  <option value={languages.japanese}>{languages.japanese.toUpperCase()}</option>
</select>

<button onclick={toggleTimeFormat}>
 {is24HourFormat ? '24' : '12'} Hour Format
</button>
</div>
<div style="padding: 24px 0;">

<button onclick={generateRandomTime}>Get Random Time</button>

<p style="background-color: aquamarine; display: inline; padding: 12px; border-radius: 8px;">{randomTime}</p>
</div>



<input type="text" bind:value={userInput} placeholder="e.g. eleven fifty-three" onkeypress={onKeyPress}/>

<button onclick={handleSubmit}>Submit</button>

<div style="display: flex;  justify-content: center;">
  <p style="padding: 6px;">Current Streak: {currentStreak}</p>
  <p style="padding: 6px;">Fails: {fails}</p>
</div>

{#if userInput && result === false}
  <p>Your answer is incorrect.</p>
  <p>Try phrases like: "midnight", "three o'clock", "quarter past seven", "three-thirty", "three forty".</p>
{/if}





