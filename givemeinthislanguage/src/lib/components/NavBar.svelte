<script>
  import { CogOutline } from "flowbite-svelte-icons";
  import { Button, Dropdown, P } from "flowbite-svelte";
  import UserSettings from "../UserSettings.svelte";
  import AppSkeleton from "./AppSkeleton.svelte";
  
  let {
    is24HourFormat,
    selectedLanguage,
    handleLanguageChange,
    toggleTimeFormat,
    selectedLesson,
  } = $props();
</script>

<AppSkeleton>
  <div
    style="display: flex; align-items:center; justify-content: space-between; width: 100%;"
  >
    <h1 style="font-weight: 600; font-size:32px">Dime</h1>
    <Button
      id="bell"
      pill={true}
      outline={true}
      class="p-0 !"
      size="xl"
      color="dark"
      style="border: none; margin-left: auto;"
    >
      <CogOutline size="lg" />
    </Button>
    <Dropdown triggeredBy="#bell" containerClass="w-64">
      <UserSettings
        {toggleTimeFormat}
        {selectedLanguage}
        {is24HourFormat}
        {handleLanguageChange}
        {selectedLesson}
      />
    </Dropdown>
  </div>
</AppSkeleton>

<style>
</style>
