<template>
  <div class="pokemon-options">
    <h1>
      <img src="@/assets/qssp.png" alt="Quién es ese Pokémon" />
    </h1>
    <ul class="options-list">
      <li
        v-for="{ name, id } in parsedPokemons"
        :key="id"
        :disabled="disableOptions"
        :class="classByResponse(id)"
        @click="selectedPokemon(id)"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pokemon Options",
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: null,
    },
    pokemonId: {
      type: Number,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      userSelection: null,
    };
  },
  methods: {
    selectedPokemon(id) {
      this.$emit("selectedPokemon", id);

      //Update state for evalutaing answers
      this.userSelection = id;
    },
    classByResponse(id) {
      if (this.isCorrect === null) return;

      if (this.isCorrect) {
        //If is correct the option selected for the user is correct
        return this.userSelection === id ? "correct active" : "incorrect";
      } else {
        //The option selected for the user is wrong
        return this.userSelection === id
          ? "incorrect active"
          : this.pokemonId === id //The correct option
          ? "correct"
          : "incorrect";
      }
    },
  },
  computed: {
    parsedPokemons() {
      return this.pokemons.map((pokemon) => ({
        ...pokemon,
        name: pokemon.name.toUpperCase(),
      }));
    },
    disableOptions() {
      return this.isCorrect !== null ? true : false;
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
  min-width: 280px;
}

.pokemon-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  width: 100%;
}

.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.options-list li {
  display: block;
  background-color: var(--gray);
  border-radius: var(--normal-radius);
  color: var(--dim);
  font-size: 2.5rem;
  font-weight: var(--medium);
  line-height: 1;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  position: relative;
  text-transform: uppercase;
  transition: 0.2s background-color, 0.2s color;
}

.options-list li[disabled="true"] {
  cursor: not-allowed;
  pointer-events: none;
}

.options-list .correct {
  background-color: var(--cyan);
  color: var(--british);
}
.options-list .incorrect {
  background-color: var(--palepink);
  color: var(--blood);
}

.options-list li:hover,
.options-list li *:hover {
  cursor: pointer;
}

.options-list li:hover {
  background-color: var(--outer);
  color: var(--ghost);
}

.options-list .correct:hover {
  background-color: var(--british);
  color: var(--ghost);
}

.options-list .incorrect:hover {
  background-color: var(--blood);
  color: var(--ghost);
}

.options-list .correct.active {
  background-color: var(--british);
  color: var(--ghost);
}

.options-list .incorrect.active {
  background-color: var(--blood);
  color: var(--ghost);
}
</style>
