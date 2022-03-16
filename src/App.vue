<template>
  <PokemonPage />
</template>

<script>
import PokemonPage from "@/pages/PokemonPage.vue";

export default {
  name: "App",
  components: {
    PokemonPage,
  },
};
</script>

<style>
#app {
  align-items: center;
  display: flex;
  gap: 2rem;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  text-align: center;

  background: linear-gradient(
    to left top,
    var(--maximun) 15%,
    var(--cadmium) 30%,
    var(--maximun) 100%
  );

  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

@media screen and (max-width: 760px) {
  #app {
    flex-direction: column;
  }
}
</style>
