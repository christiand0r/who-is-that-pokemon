import getPokemonsOptions, {
  getPokemons,
  getPokemonsName,
} from "@/helpers/getPokemonsOptions";

describe("getPokemonsOptions - Helper", () => {
  test("debe retornar un arreglo de números", () => {
    const pokemons = getPokemons();

    //Each element must be a Number
    pokemons.forEach((el) => expect(typeof el === "number").toBeTruthy());
  });

  test("debe retornar un arreglo de 650 posiciones", () => {
    const pokemons = getPokemons();

    expect(pokemons).toHaveLength(650);
  });

  test("debe retornar un arreglo de 4 posiciones con nombres de pokemon", async () => {
    //Bulbasaur, Charmander, Squirtle and Pikachu
    const pokemons = await getPokemonsName([1, 4, 7, 25]);

    const arrayExpected = [
      {
        id: 1,
        name: "bulbasaur",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
      },
      {
        id: 4,
        name: "charmander",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
      },
      {
        id: 7,
        name: "squirtle",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",
      },
      {
        id: 25,
        name: "pikachu",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
      },
    ];

    expect(pokemons).toEqual(expect.arrayContaining(arrayExpected));
  });

  test("getPokemonsOptions debe retornar un arreglo mezclado", async () => {
    const pokemons = await getPokemonsOptions();

    //Each pokemon must be equal that structure object
    pokemons.forEach((pokemon) =>
      expect(pokemon).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        sprite: expect.any(String),
      })
    );

    expect(pokemons).toHaveLength(4);
  });
});
