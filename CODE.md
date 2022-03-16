# APUNTES SOBRE EL CÓDIGO

## **classByResponse( id )**

Esta función asigna una clase según la respuesta elegida por el usuario. Al ser un método que evalue 6 condiciones se busco un código que no supererá los dos niveles de anidación. Las 6 condiciones son:

1. La respuesta es correcta
2. La respuesta es incorrecta
3. Si la respuesta es correcta, colocar la elección del usuario como correcta y la demás opciones en incorrectas
4. Si la respuesta es incorrecta, colocar la elección del usuario como incorrecta
5. Si la respuesta es incorrecta, mostrar la respuesta correcta
6. Si la respuesta es incorrecta, colocar las opciones no elegidas por el usuario como incorrectas

Partiendo de esto establecemos las dos condiciones de las que partes las 3 restantes

```
//Correcta o Incorrecta


if(isCorrect) {

  //Condicion 1. resuelta✅

} else {

  //Condicion 2. resuelta✅

}

```

Una vez establecido esto debemos de considerar que siempre tenemos que retornar algo para que Vue establezca los valores y no siga con las validaciones, para evitar anidaciones de if-else usaremos operadores tenernarios.

Comencemos en el bloque de si la respuesta es correcta

```

if (this.isCorrect) {

  //Condicion 3. resulta✅

  return this.userSelection === id ? "correct active" : "incorrect";

}

```

Recordemos que en el componente encargado de esto tenemos dos estados ( Llamo estado al objeto que retorna el **método data**).

- userSelection: encargada de guardar la opción elegida por el usuario
- pokemonId: encargada de recibir del padre el id del pokemon correcto

Una vez el usuario elige recorreremos el listado de opciones generados por un v-for y según esa condición asignares la clase.

Ahora la parte complicada es cuando la respuesta es incorrecta porque si queremos validar de forma independiente tendriamos que agregar dentro del else un nuevo bloque if-else-if-else, esto es lo que queremos evitar:

```

if (this.isCorrect) {

  //If is correct the option selected for the user is correct
  return this.userSelection === id ? "correct active" : "incorrect";

} else {

  if(this.userSelection === id) {

    //... ESTOS ES

  } else if( this.pokemonId === id ) {

    //... LO QUE

  } else {

    //... QUEREMOS EVITAR

  }

}

```

Para eso utilizaremos el operador ternario de la siguiente forma

```

if (this.isCorrect) {

  return this.userSelection === id ? "correct active" : "incorrect";

} else {

  //Condicion 4. resulta✅
  return this.userSelection === id
          ? "incorrect active"

          : this.pokemonId === id
          ? "correct" //Condicion 3. resulta✅

          : "incorrect"; //Condicion 6. resulta✅
}

```

De esta forma el código reduce sus anidaciones, aunque en consideración puede que complique más la lectura

### **Resultado final del código**

```

classByResponse(id) {

      if (this.isCorrect === null) return; //Ignorar no es parte de la problemática

      if (this.isCorrect) {

        return this.userSelection === id ? "correct active" : "incorrect";

      } else {

        return this.userSelection === id
          ? "incorrect active"
          : this.pokemonId === id
          ? "correct"
          : "incorrect";

      }

    }

```
