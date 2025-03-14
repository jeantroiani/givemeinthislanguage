<script lang="ts">
  import { Input, Label, P } from "flowbite-svelte";
  import { Button } from "flowbite-svelte";
  import AppSkeleton from "./components/AppSkeleton.svelte";
  import { languagesData } from "../wordsToNumbers/languagesMap";
  import { MIDNIGHT } from "../wordsToNumbers/variables";
  import pixelClock from "../assets/pixel-clock.png";

  let randomTime: string = $state(getRandomTime());
  let userInput: string = $state("");
  let result: boolean | null = $state(null);
  let currentStreak: number = $state(0);
  let fails: number = $state(0);

  const { selectedLanguage, is24HourFormat } = $props();

  function getRandomTime(): string {
    const hours = Math.floor(Math.random() * (is24HourFormat ? 24 : 12));
    const minutes = Math.floor(Math.random() * 60);
    const formattedHours = is24HourFormat ? hours : hours === 0 ? 12 : hours;
    return `${formattedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`.trim();
  }

  function convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(":").map(Number);
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${formattedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  function generateRandomTime() {
    randomTime = getRandomTime();
  }

  function handleSubmit() {
    if (!userInput) return;
    const userTime = languagesData[selectedLanguage].conversionFunction(
      userInput.trim()
    );
    const randomTimeConverted =
      randomTime === MIDNIGHT ? randomTime : convertTo12HourFormat(randomTime);
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

<AppSkeleton>
  <div class="lesson-title">
    <h2
      style="font-family: {languagesData[selectedLanguage]?.titleFontFamily ||
        'inherit'}; font-size: 28px; text-align: center;"
    >
      {languagesData[selectedLanguage].title}
    </h2>
  </div>
</AppSkeleton>

<div class="lesson-image">
  <AppSkeleton>
    <div
      style="flex: 1 auto; display: flex; flex-direction: column; text-align: center;"
    >
      <div style="padding: 0;">
        <P
          style="font-family: 'Orbitron'; 
          font-weight: bold;
          font-size: 2.5rem;
          background-image: url({pixelClock});
          background-position: -18px -132px;
          background-size: 410px;
          width: 320px;
          height: 190px;
          display: inline-flex;
          align-items: center;
          justify-content: center;"
        >
          {randomTime}
        </P>
      </div>
    </div>
  </AppSkeleton>
</div>

<AppSkeleton>
  <div style="display: flex; justify-content: center;">
    <div class="instructions">
      <h3>Tips for telling time in words:</h3>
      <ul>
        <li>
          <p class="instruction-paragraph">
            For hours, use words like "one", "two", "three", etc.
          </p>
        </li>
        <li>
          <p class="instruction-paragraph">
            For minutes, say the number: "five", "ten", "fifteen", etc.
          </p>
        </li>
        <li>
          <p class="instruction-paragraph">
            For whole hours, you can say "o'clock" (e.g., "five o'clock")
          </p>
        </li>
        <li>
          <p class="instruction-paragraph">
            For 30 minutes, you can say "half past" (e.g., "half past five")
          </p>
        </li>
        <li>
          <p class="instruction-paragraph">
            For 15 minutes, you can say "quarter past" or "quarter to"
          </p>
        </li>
        <li>
          <p class="instruction-paragraph">
            Examples: "three fifteen", "quarter past three", "half past four",
            "quarter to nine"
          </p>
        </li>
      </ul>
    </div>
    <div style="width: 320px; flex: 0 0 50%;">
      <Label for="time" style="font-size: 0.5;">
        Write the time in words:

        <Input
          id="time"
          type="text"
          bind:value={userInput}
          placeholder="e.g. eleven fifty-three"
          onkeypress={onKeyPress}
        />
      </Label>
      <div
        style="display: flex; justify-content: center; margin-top: 16px; flex-direction: column; margin: 0 auto;"
      >
        {#if userInput && result === false}
          <P>Your answer is incorrect.</P>
        {/if}
      </div>
      <div class="button-group">
        <Button style="width: 120px;" color="alternative" onclick={handlePass}>
          Pass
        </Button>
        <Button
          style="width: 120px; margin-left: 24px;"
          color="dark"
          onclick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <div
        style="display: flex; justify-content: flex-start; flex-direction: column;"
      >
        <h3>Score:</h3>
        <p>Asserted: {currentStreak}</p>
        <p>Failed: {fails}</p>
      </div>
    </div>
  </div>
</AppSkeleton>

<style>
  .lesson-title {
    padding: 24px 0;
    display: inline-block;
    width: 100%;
  }
  .lesson-image {
    background-image: url("../assets/pixel-street.png");
    background-size: cover;
    display: inline-flex;
    width: 100%;
    height: 400px;
    justify-content: center;
    align-items: center;
    margin: 0 0 64px;
  }
  .instructions {
    font-size: 1.25rem;
    margin-bottom: 16px;
    flex: 0 0 50%;
    padding-right: 64px;
  }
  .instructions li {
    margin-top: 16px;
    font-size: medium;
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
  }
  h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  p {
    margin-top: 16px;
    font-size: medium;
  }
</style>
