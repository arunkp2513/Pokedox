let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      //console.log(pokemon);
      showModal(pokemon);
    });
  }

  function addListen(button, pokemon) {
    button.addEventListener('click', function() {
      //adding an event listener which listens to event click
      showDetails(pokemon);
    });
  }

  //Searching for a pokemon
  function findPokemon(name) {
    if (!name) {
      return pokemonList;
    }
    return pokemonList.filter(pokemonName =>
      pokemonName.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  function loadFindPokemon() {
    //Displaying entire pokemonList
    pokemonList.forEach(addListItem);
    //reference for the pokemonList
    let container = document.querySelector('.list-group');
    //Event listener
    document.querySelector('#search-input').addEventListener('input', event => {
      container.innerHTML = ' ';
      let findPokemonList = findPokemon(event.target.value);
      findPokemonList.forEach(addListItem);
    });
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.list-group'); // pokemon variable with ul element
    let listItem = document.createElement('li'); // Creating li element
    let button = document.createElement('button'); // creating button element

    listItem.classList.add('group-list-item');
    button.innerText = pokemon.name;
    //button.classList.add('container');
    button.classList.add('btn-primary');
    // Adding datatoggle and data target
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    listItem.appendChild(button); // appending button to listItem as its appendChild
    list.appendChild(listItem); //appending listItem to unordered list
    addListen(button, pokemon); // separate function to add an addEventListener
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function(element) {
          item.types.push(element.type.name);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  // Creating a modal
  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerHTML = ' ';
    modalBody.innerHTML = ' ';
    // Setting name to be the title
    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;
    modalTitle.appendChild(nameElement);

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height of pokemon = ' + pokemon.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'weight of pokemon = ' + pokemon.weight;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types = ' + pokemon.types.join(',');

    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    loadFindPokemon: loadFindPokemon
  };
})();
//Loading data
//pokemonRepository.loadList().then(function() {
//  pokemonRepository.getAll().forEach(function(pokemon) {
//  pokemonRepository.addListItem(pokemon);
//  });
//});

pokemonRepository.loadList().then(function() {
  pokemonRepository.loadFindPokemon();
});
