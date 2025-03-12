<script lang="ts">
  import { languagesData } from "../wordsToNumbers/languagesMap";

  import { MIDNIGHT } from "../wordsToNumbers/variables";
	import pixelClock from '../assets/pixel-clock.png';

  let randomTime: string = $state(MIDNIGHT);
  let userInput: string = $state('');
  let result: boolean | null = $state(null);
  let currentStreak: number = $state(0);
  let fails: number = $state(0);

  let {language, is24HourFormat} = $props();

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
    const userTime = languagesData[language].conversionFunction(userInput.trim());
    const randomTimeConverted = randomTime === MIDNIGHT ? randomTime : convertTo12HourFormat(randomTime);
    result = userTime === randomTimeConverted;
    if (result) {
      currentStreak += 1;
      generateRandomTime();
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

<div style="flex: 1 auto; display: flex; width: 320px; flex-direction: column;">

<h2 style="font-family: {languagesData[language]?.titleFontFamily || 'inherit'};">{languagesData[language].title}</h2>


<div style="padding: 24px 0;">
  <button onclick={generateRandomTime}>Get Random Time</button>
  <p style="font-family: 'Orbitron'; 
    color: #555;
    font-weight: bold;
    background-image: url({pixelClock});
    background-position: -21px -43px;
    background-size: 190px;
    width: 125px;
    height: 125px;
    display: inline-flex;
    align-items: center;
    justify-content: center;">{randomTime}</p>
</div>

<div>
<input type="text" bind:value={userInput} placeholder="e.g. eleven fifty-three" onkeypress={onKeyPress} />
<button onclick={handleSubmit}>Submit</button>
</div>

<div style="display: flex; justify-content: center;">
  <p style="padding: 6px;">Current Streak: {currentStreak}</p>
  <p style="padding: 6px;">Fails: {fails}</p>
</div>

{#if userInput && result === false}
  <p>Your answer is incorrect.</p>
  <p>Try phrases like: "midnight", "three o'clock", "quarter past seven", "three-thirty", "three forty".</p>
{/if}
</div>




