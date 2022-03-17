import pokemonApi from "@/api/pokemonApi";

describe("pokemon API", () => {
  test("axios debe estar configurando con el api de pokemon", () => {
    //Endpoint pokemon api
    const URL = "https://pokeapi.co/api/v2/pokemon";

    //Destructuring instance axios
    const { defaults } = pokemonApi;

    expect(defaults.baseURL).toBe(URL);
  });
});
