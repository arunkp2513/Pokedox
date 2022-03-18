let pokemonRepository = (function() {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function n(t) {
    e.push(t);
  }
  function o(e) {
    r(e).then(function() {
      !(function(e) {
        let t = document.querySelector(".modal-title"),
          n = document.querySelector(".modal-body");
        (t.innerHTML = " "), (n.innerHTML = " ");
        let o = document.createElement("h1");
        (o.innerText = e.name), t.appendChild(o);
        let i = document.createElement("p");
        i.innerText = "Height of pokemon = " + e.height;
        let r = document.createElement("p");
        r.innerText = "weight of pokemon = " + e.weight;
        let c = document.createElement("img");
        c.src = e.imageUrl;
        let l = document.createElement("p");
        (l.innerText = "Types = " + e.types.join(",")),
          n.appendChild(c),
          n.appendChild(i),
          n.appendChild(r),
          n.appendChild(l);
      })(e);
    });
  }
  function i(e) {
    let t = document.querySelector(".list-group"),
      n = document.createElement("li"),
      i = document.createElement("button");
    n.classList.add("group-list-item"),
      (i.innerText = e.name),
      i.classList.add("btn-primary"),
      i.setAttribute("data-toggle", "modal"),
      i.setAttribute("data-target", "#pokemonModal"),
      n.appendChild(i),
      t.appendChild(n),
      (function(e, t) {
        e.addEventListener("click", function() {
          o(t);
        });
      })(i, e);
  }
  function r(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.weight = t.weight),
          (e.types = []),
          t.types.forEach(function(t) {
            e.types.push(t.type.name);
          });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  return {
    add: n,
    getAll: function() {
      return e;
    },
    addListItem: i,
    loadList: function() {
      return fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(e) {
          e.results.forEach(function(e) {
            n({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    loadDetails: r,
    loadFindPokemon: function() {
      e.forEach(i);
      let t = document.querySelector(".list-group");
      document.querySelector("#search-input").addEventListener("input", n => {
        (t.innerHTML = " "),
          (function(t) {
            return t
              ? e.filter(e => e.name.toLowerCase().includes(t.toLowerCase()))
              : e;
          })(n.target.value).forEach(i);
      });
    }
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.loadFindPokemon();
});
