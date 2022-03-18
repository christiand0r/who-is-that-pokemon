import { shallowMount } from "@vue/test-utils";
import { mockPokemons } from "../../mocks/mockPokemons.mock";
import PokemonOptions from "@/components/PokemonOptions.vue";

describe("Pokemon Options - Component", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
        pokemonId: 70,
      },
      data() {
        return {
          userSelection: null,
        };
      },
    });
  });

  test("debe ser igual que el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debemos mostrar 4 opciones de pokemon en el orden recibido", () => {
    const options = wrapper.findAll("ul li");

    expect(options).toHaveLength(4);

    //Iterate the array and for each option checks if the text is equal to the name of the pokemon to which its position corresponds

    options.forEach((opt, index) =>
      expect(opt.text()).toBe(wrapper.vm.pokemons[index].name)
    );
  });

  test("elegir una opción debe actualizar la data", async () => {
    const options = wrapper.findAll("ul li");

    for (let i = 0; i < options.length; i++) {
      await options[i].trigger("click");

      expect(wrapper.vm.userSelection).toBe(wrapper.vm.pokemons[i].id);
    }
  });

  test('elegir una opcion debe emitir "selectedPokemon"', () => {
    const options = wrapper.findAll("ul li");

    options.forEach((opt, index) => {
      opt.trigger("click");

      //Check if value in the array of emmits is equals to id pokemon in pokemons
      expect(wrapper.emitted("selectedPokemon")[index]).toEqual([
        wrapper.vm.pokemons[index].id,
      ]);
    });

    expect(wrapper.emitted("selectedPokemon")).toHaveLength(4);
  });
});
