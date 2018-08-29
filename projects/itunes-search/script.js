import 'shoelace-css/dist/shoelace.css'
import './text.css'
import request from 'superagent'

getId('output').addEventListener('click', function (e) {
  if (e.target && e.target.matches('resultItem')) {
  } console.log('something')
})

// accessing DOM events
function createDOM (item) {
  // if an item (from the earlier for loop) is in the index
  // as key/value pair "kind" : "song" ...
  if (item.kind === 'song') {
    // resultsList EQUALS the output div (for results)
    let resultsList = getId('output')
    // resultsLi IS the list item(s) under the output div
    // (from HTML element = 'output'), appending them to the list
    let resultsLi = document.createElement('output-list')
    // resultsLi is now an HTML element (created from 'output-list')
    // that puts a DOM node on every instance of a returned result
    // of .classList and adds that item to the DOM
    resultsLi.classList.add('resultItem')
    // inputs styled HTML with template literals referencing DOM, then API
    resultsLi.innerHTML = `<div id='entryStyling'><div id='info'><img src="${item.artworkUrl100}"><br>
                           <p id='text'>${item.trackName}</p></div>`
    // puts new list items into what will render on screen via HTML
    // NOT SURE how to filter out duplicates from this list
    resultsList.appendChild(resultsLi)
    console.log(resultsLi)
  }
}

// calling a DOM element, adding an event listener to its parent with
// a preventDefault method attached to prevent a mishandling that would
// prevent search form from loading
getId('search-form').addEventListener('submit', (event) => {
  event.preventDefault()
  // getting search from html
  let searchResults = getId('search-form')
  // for when you click the search-form and it processes the event
  searchResults.addEventListener('click', function (event) {})
  let searchField = getId('search')
  let searchTerm = window.encodeURIComponent(searchField.value)
  request.get(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=song&attribute=artistTerm`)
    .then(response => {
      return JSON.parse(response.text)
    })
    .then(body => {
      getId('output-list').innerHTML = ''
      let searchResults = (body.results)
      // for loop to examine the array body.results
      for (var i = 0; i < body.results.length; i++) {
        // for loop by singular "item" (arbitrary name)
        // of index location (as many as they are, i.e.: body.results.length)
        // and maps these on to a DOM node that can be accessed
        for (let item of body.results) {
          createDOM(item)
        }
      }
    })
})

function getId (id) {
  return document.getElementById(id)
}
