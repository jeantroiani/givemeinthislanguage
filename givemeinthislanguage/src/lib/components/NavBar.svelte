<script>
  import { CogOutline } from 'flowbite-svelte-icons';

  import { Button, Dropdown, DropdownItem, P } from "flowbite-svelte";
  import UserSettings from "../UserSettings.svelte";
  let {is24HourFormat, selectedLanguage, handleLanguageChange, toggleTimeFormat, selectedLesson} = $props()

</script>

<div style='display: flex; align-items:center; justify-content: space-between;'>
<P style='font-weight: 600;' size="4xl">Dimelo</P>
<Button id="bell" pill={true} outline={true} class="p-0 !" size="xl" color="dark" style='border: none; margin-left: auto; margin-right: 180px;'>
  <CogOutline size='lg'/>
</Button>
<Dropdown triggeredBy="#bell" containerClass="w-64">
    <UserSettings  {toggleTimeFormat} 
    selectedLanguage={selectedLanguage} 
    {is24HourFormat} 
    {handleLanguageChange}
    selectedLesson={selectedLesson} />
</Dropdown>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    background-color: rgb(142, 180, 189);
    padding: 0 24px;
  }
</style>
