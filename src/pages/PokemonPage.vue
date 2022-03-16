<template>
  <template v-if="!pokemon">
    <div class="loader">
      <div class="icon">
        <img src="@/assets/pokeball.gif" alt="Pokeball" />
      </div>
      <h1>Cargando...</h1>
    </div>
  </template>

  <template v-else>
    <PokemonPicture
      :pokemon-image="pokemon.sprite"
      :show-pokemon="showPokemon"
    />
    <div class="pokemon-container">
      <PokemonOptions
        :pokemons="pokemonArray"
        :pokemon-id="pokemon.id"
        :is-correct="isCorrect"
        @selected-pokemon="checkAnswer"
      />
      <div class="play-again">
        <button v-if="playAgain" @click="newGame">Jugar de nuevo</button>
      </div>
    </div>
  </template>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import getPokemonOptions from "@/helpers/getPokemonsOptions";

export default {
  name: "Pokemon Page",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemon: null,
      isCorrect: null,
      pokemonArray: [],
      playAgain: false,
      showPokemon: false,
    };
  },
  mounted() {
    this.mixPokemonArray();
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArray = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);

      this.pokemon = this.pokemonArray[rndInt];
    },
    checkAnswer(selectedId) {
      this.playAgain = true;
      this.showPokemon = true;

      this.pokemon.id === selectedId
        ? (this.isCorrect = true)
        : (this.isCorrect = false);
    },
    newGame() {
      //Reset State
      this.pokemon = null;
      this.pokemonArray = [];
      this.showPokemon = false;
      this.isCorrect = null;
      this.playAgain = false;

      //Call sort method
      this.mixPokemonArray();
    },
  },
};
</script>

<style scoped>
.pokemon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  z-index: 4;
  width: 50%;
}
.loader {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  overflow: hidden;
}

.loader {
  color: #fff;
  flex-direction: column;
  gap: 0;
}

.loader h1 {
  margin: 0;
}

.icon {
  width: 80px;
  height: 80px;
}

.icon img {
  height: 100%;
  object-fit: cover;
}

.play-again {
  display: flex;
  justify-content: end;
  max-width: 480px;
  width: 100%;
}

.play-again button {
  background-color: var(--lapis);
  border-radius: var(--normal-radius);
  border: none;
  color: var(--ghost);
  font-size: 1.8rem;
  font-weight: var(--normal);
  padding: 1.5rem;
  text-transform: uppercase;
  transition: 0.3s background-color ease;
}

.play-again button:hover {
  background-color: var(--blue);
  cursor: pointer;
}

@media screen and (max-width: 760px) {
  .pokemon-container {
    width: 100%;
  }
}
</style>
