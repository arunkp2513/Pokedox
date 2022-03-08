let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modalContainer');

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
    button.addEventListener('click', function(event) { //adding an event listener which listens to event click
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-List'); // poke variable with ul element
    let listItem = document.createElement('li'); // Creating li element
    let button = document.createElement('button'); // creating button element
    button.innerText = pokemon.name;
    button.classList.add('container');
    listItem.appendChild(button); // appending button to listItem as its appendChild
    list.appendChild(listItem); //appending listItem to unordered list
    addListen(button, pokemon); // separate function to add an addEventListener
    //});
  }

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }
  // Creating a modal
  function showModal(pokemon) {
    modalContainer.innerHTML = ' ';
    modalContainer.classList.add('is-visible');

    let modal = document.createElement('div');
    modal.classList.add('modal');
    //New modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height of pokemon = ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  // Pressing escape button scenario
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();
//Loading data
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
