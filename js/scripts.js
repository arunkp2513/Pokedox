let pokemonRepository = (function() {
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

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListen(button, pokemon) {
    button.addEventListener('click', function(event) { //adding an event listener which listens to event click
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let poke = document.querySelector('.pokemon-List'); // poke variable with ul element
    let listItem = document.createElement('li'); // Creating li element
    let button = document.createElement('button'); // creating button element
    button.innerText = pokemon.name;
    button.classList.add('cont');
    listItem.appendChild(button); // apeending button to listItem as its appendChild
    poke.appendChild(listItem); //appending listItem to unordered list
    addListen(button, pokemon); // separate function to add an addEventListener
    //});
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
