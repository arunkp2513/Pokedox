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
            console.log(pokemon);
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
          button.classList.add('cont');
          listItem.appendChild(button); // apeending button to listItem as its appendChild
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

        return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails:showDetails
        };
      })();
    //Loading data
    pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    });
