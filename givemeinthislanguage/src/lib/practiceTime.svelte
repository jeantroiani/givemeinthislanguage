<script lang="ts">
    import { Input, P } from 'flowbite-svelte';
  import { Button } from 'flowbite-svelte';

  import { languagesData } from "../wordsToNumbers/languagesMap";

  import { MIDNIGHT } from "../wordsToNumbers/variables";
  import pixelClock from '../assets/pixel-clock.png';
  import pixelStreet from '../assets/pixel-street.png';

  let randomTime: string = $state(getRandomTime());
  let userInput: string = $state('');
  let result: boolean | null = $state(null);
  let currentStreak: number = $state(0);
  let fails: number = $state(0);

  const {selectedLanguage, is24HourFormat} = $props();

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
    const userTime = languagesData[selectedLanguage].conversionFunction(userInput.trim());
    const randomTimeConverted = randomTime === MIDNIGHT ? randomTime : convertTo12HourFormat(randomTime);
    result = userTime === randomTimeConverted;
    if (result) {
      currentStreak += 1;
      generateRandomTime();
    } else {
      fails += 1;
    }
  }

    function handlePass() {
      generateRandomTime();
      fails += 1;
  }

  const onKeyPress = (e: KeyboardEvent) => {
    const regex = /^[a-zA-Z-' ]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

</script>

<div style="flex: 1 auto; display: flex; flex-direction: column; text-align: center;">

  <div class='lesson-title'>
<P align='center' size="4xl" style="font-family: {languagesData[selectedLanguage]?.titleFontFamily || 'inherit'};">{languagesData[selectedLanguage].title}</P>
</div>
<div style='background-image: url({pixelStreet}); background-size: cover; display: flex; width: 100%; height: 400px; justify-content: center; align-items: center; margin: 0 0 64px;'>

<div style="padding: 0;">
  <P style="font-family: 'Orbitron'; 
    font-weight: bold;
    font-size: 2.5rem;
    background-image: url({pixelClock});
    background-position: -18px -132px;
    background-size: 410px;
    width:  320px;
    height: 190px;
    display: inline-flex;
    align-items: center;
    display: flex;

    justify-content: center;">{randomTime}</P>
</div>
</div>
<div style='max-width: 320px; text-align: center; display: flex; flex-direction: column; margin: 0 auto;'>
<Input  type="text" bind:value={userInput} placeholder="e.g. eleven fifty-three" onkeypress={onKeyPress} />
<div style='display: flex;'> 
<Button style='margin: 16px 0; width: 120px; margin-right: 32px;' color="dark" onclick={handleSubmit}>Submit</Button >
<Button  style='margin: 16px 0; width: 120px;' color="alternative" onclick={handlePass}>Pass</Button >
  </div>
</div>

<div style="display: flex; justify-content: center;">
  <P class="mt-4">Asserted: {currentStreak}</P>
  <P class="mt-4" style='margin-left: 16px;'>Failed: {fails}</P>
</div>

<div style="display: flex; justify-content: center; margin-top: 16px; flex-direction: column; max-width: 320px; margin: 0 auto;">
  {#if result === true}
  <P>Your answer is correct!</P>
  <P>Well done!</P>
  {/if}

{#if userInput && result === false}
  <P>Your answer is incorrect.</P>
  <P>Try phrases like: "midnight", "three o'clock", "quarter past seven", "three-thirty", "three forty".</P>
{/if}
</div>
</div>

<style>
  .lesson-title {
    padding: 24px 0;
    background-color: rgb(178, 212, 201);
  }
</style>