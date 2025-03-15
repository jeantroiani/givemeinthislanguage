<div>
    <slot />
</div>

<style>
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 48px;
  }
    @media (max-width: 720px) {
    div {
    padding: 0 12px;
    }
  }
</style>