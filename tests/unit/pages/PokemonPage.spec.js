import { shallowMount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage.vue";
import { mockPokemons } from "../mocks/mockPokemons.mock";

describe("Pokemon Page - Component", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("debe llamar a mixPokemonArray cuando sea montado", () => {
    //Spy the function mixPokemonArray
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );

    //Invoque again the wrapper cause' need check if when mounted the function is called
    const wrapper = shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("debe de ser igual al snapshot cuando cargan los pokemones", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemon: mockPokemons[3],
          isCorrect: null,
          pokemonArray: mockPokemons,
          playAgain: false,
          showPokemon: false,
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar los componentes PokemonPicture y PokemonOptions con sus respectivos atributos", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemon: mockPokemons[3],
          isCorrect: null,
          pokemonArray: mockPokemons,
          playAgain: false,
          showPokemon: false,
        };
      },
    });

    const pokemonPicture = wrapper.find("pokemon-picture-stub");
    const pokemonOptions = wrapper.find("pokemon-options-stub");

    //Pokemon Picture Component
    expect(pokemonPicture.exists()).toBe(true);

    //Pokemon Options Component
    expect(pokemonOptions.exists()).toBe(true);

    //Evaluate expect with vm
    expect(pokemonPicture.attributes("pokemonimage")).toBe(
      wrapper.vm.pokemon.sprite
    );

    expect(pokemonOptions.attributes("pokemons")).toBeTruthy();

    //Evaluate expect with mock
    expect(pokemonOptions.attributes("pokemonid")).toBe(
      String(mockPokemons[3].id)
    );
  });

  test("método CheckAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemon: mockPokemons[3],
          isCorrect: null,
          pokemonArray: mockPokemons,
          playAgain: false,
          showPokemon: false,
        };
      },
    });
    //Set the correct id then state isCorrect must be true
    await wrapper.vm.checkAnswer(mockPokemons[3].id);
    expect(wrapper.vm.isCorrect).toBe(true);

    //Set the incorrect id then state isCorrect must be false
    await wrapper.vm.checkAnswer(mockPokemons[0].id);
    expect(wrapper.vm.isCorrect).toBe(false);

    //If checkAnswer is called the button play must be exist
    expect(wrapper.vm.playAgain).toBe(true);
    expect(wrapper.find(".play-again button").exists()).toBe(true);

    //If checkAnswer is called the state showPokemon must be true
    expect(wrapper.vm.showPokemon).toBe(true);
  });

  test("método newGame", async () => {
    //Spy for method newGame
    const newGameSpy = jest.spyOn(PokemonPage.methods, "newGame");

    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemon: mockPokemons[3],
          isCorrect: null,
          pokemonArray: mockPokemons,
          playAgain: false,
          showPokemon: false,
        };
      },
    });

    await wrapper.vm.newGame();

    expect(newGameSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.pokemon).not.toEqual(mockPokemons[3]);
  });
});
