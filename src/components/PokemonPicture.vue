<template>
  <div class="container">
    <div class="pokemon-image">
      <img
        :src="pokemonSource"
        alt="Pokémon"
        class="move-with-fade hidden-pokemon"
      />

      <img
        v-if="showPokemon"
        :src="pokemonSource"
        alt="Pokémon"
        class="fade-in"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Pokemon Picture",
  props: {
    pokemonImage: {
      type: String,
      required: true,
      default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    pokemonSource() {
      return this.pokemonImage;
    },
  },
};
</script>

<style scoped>
img {
  left: 0;
  max-height: 320px;
  max-width: 320px;
  min-height: 320px;
  min-width: 320px;
  object-fit: contain;
  position: absolute;
  top: 0;
  user-select: none;

  -webkit-user-drag: none;
  z-index: 2;
}

.container {
  position: relative;
}

.container::after {
  background: url("@/assets/circle-spikes.png") no-repeat center center / 100%;
  bottom: -300px;
  content: "";
  height: 900px;
  left: -300px;
  position: absolute;
  width: 900px;
}

.hidden-pokemon {
  filter: brightness(0);
}

.pokemon-image {
  margin: 5rem 0 0 0;
  position: relative;
  min-width: 320px;
  min-height: 320px;
}
</style>
