import { shallowMount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture.vue";

describe("PokemonPicture - Component", () => {
  test("debe ser igual que el snapshot", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        showPokemon: false,
        pokemonImage:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe mostrar la silueta del pokemon", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        showPokemon: false,
        pokemonImage:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
      },
    });

    const [hiddenImage, image] = wrapper.findAll("img");

    //Image without filter should not load
    expect(image).toBeUndefined();

    //The silhouette must be shown
    expect(hiddenImage.exists()).toBeTruthy();

    //The silhouette source must be equals to pokemonImage
    expect(hiddenImage.attributes("src")).toBe(wrapper.vm.pokemonImage);

    //Check if the number before dot svg is the correct, don't need this test cause' pass the url complete
    //expect(hiddenImage.attributes("src")).toMatch("7.svg");

    //The silhouette must be have this class
    expect(hiddenImage.classes("hidden-pokemon")).toBeTruthy();
  });

  test("debe mostrar el pokemon si showPokemon: true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        showPokemon: true,
        pokemonImage:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
      },
    });

    const image = wrapper.find("img");

    //Image without filter must be shown
    expect(image.exists()).toBeTruthy();

    //The class hidden-pokemon shouldn't shown
    expect(image.classes("hidden-pokemon")).toBeFalsy();

    //The class fade-in must be shown
    expect(image.classes("fade-in")).toBeTruthy();
  });
});
