let pokemonRepository = (function (){
let pokemonList = [{
    name: "Bulbasur",
    height: 7,
    type: ["grass", "poison"],
  },
  {
    name: "Incineroar",
    height: 6,
    type: ["fire", "dark"],
  },
  {
    name: "Pidgey",
    height: 1,
    type: ["normal", "flying"],
  },
];

function add(pokemon){
  pokemonList.push(pokemon);
}
function getAll(){
  return pokemonList;
}

return{
  add: add,
  getAll : getAll
};
}) ();

pokemonRepository.getAll().forEach(function(pokemon) {
  console.log(pokemon);
});

/*for (i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + "(height:" + pokemonList[i].height + ") ");
}

for (i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 5) {
    document.write(pokemonList[i].name + "(height:" + pokemonList[i].height + ") ");
  } else if (pokemonList[i].height > 5) {
    document.write(pokemonList[i].name + "(height:" + pokemonList[i].height + ") " + " wow,Thats big!");
  } else {
    document.write(pokemonList[i].name + "(height:" + pokemonList[i].height + ") ");
  }
}*/
