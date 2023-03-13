const btnSubmit = document.getElementById("btn-submit");
const inputText = document.getElementById("pokemon-input");
const pokeinfo = document.getElementById('pokeinfo');
const notFoundContainer = document.getElementById('not-found')
const form = document.getElementById('my-form')

function run() {
  const textValue = inputText.value;
  if (isValidValue(textValue)) {
    searchPokemonInformation(textValue)
    inputText.classList.add('valid-value')
    inputText.classList.remove('invalid-value')
  } else {
    inputText.classList.remove('valid-value')
    inputText.classList.add('invalid-value')
  }
}

btnSubmit.addEventListener('click', run)
inputText.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    run()
  }
})
form.addEventListener('submit', (event) => {
  event.preventDefault()
})

const pokemonName = document.getElementById("name");
const pokemonId = document.getElementById("content-id");
const pokemonHeight= document.getElementById("content-height"); 
const pokemonWeight= document.getElementById("content-weight");
const pokemonType= document.getElementById("content-type");
const pokemonImg= document.getElementById("content-img");

function setPokemonInformation (id, name, height, weight, types, imageUrl) {
  pokemonId.textContent = id;
  pokemonName.textContent = name;
  pokemonHeight.textContent = `${height / 10} m`;
  pokemonWeight.textContent = `${weight / 10} Kg`;
  pokemonType.textContent = types;
  pokemonImg.setAttribute('src', imageUrl)
}

async function searchPokemonInformation(input) {
  const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
  if (request.ok) {
    const body = await request.json();
    pokeinfo.classList.remove('hide');
    notFoundContainer.classList.add('hide');

    const typesArray = body.types.map(item => item.type.name); // ['Electric', 'Fight']
    const types = typesArray.join(', ')

    setPokemonInformation(body.id, body.name, body.height, body.weight, types, body.sprites.front_default)
  }
  else {
    console.log(request)
    notFoundContainer.classList.remove('hide');
    pokeinfo.classList.add('hide');
  }
}

function isValidValue (value) {
  return typeof value === 'string' && value.length > 0 && value.length < 30;
}

// setPokemonInformation('101', 'Pikachu', 50, 10, 'Electrico');
/* const a = 'myString'
const b = "myString 2"
const c = a + ' ' + b
const d = `Yo tengo un string ${a} y tambien tengo un string ${b}` */

/* const functionA = (parametro1) => {
  return parametro1 + 1
}

function functionB (parametro1) {
  return parametro1 + 1
} */
