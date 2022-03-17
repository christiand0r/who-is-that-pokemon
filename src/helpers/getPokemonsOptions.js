import pokemonApi from "@/api/pokemonApi";

export const mixPokemons = (arr = []) => {
  //Traverse in reverse
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //Random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Mixin
  }

  return arr;
};

export const getPokemonsName = async (pokemons = []) => {
  const requestPokemons = pokemons.map((pokemon) =>
    pokemonApi.get(`/${pokemon}`)
  );

  const responsePokemons = await Promise.all(requestPokemons);

  return responsePokemons.map(({ data }) => {
    const { id, name, sprites } = data;

    return {
      id,
      name,
      sprite: sprites.other.dream_world.front_default,
    };
  });
};

export const getPokemons = () => {
  const pokemonArray = [...Array(650)].map((_, index) => index + 1);

  return pokemonArray;
};

//getPokemonsOptions
export default async () => {
  const pokemons = getPokemons();

  const mixedPokemon = mixPokemons(pokemons);

  const pokemonChosen = await getPokemonsName(mixedPokemon.splice(0, 4));

  return pokemonChosen;
};
