'use strict';

const API = 'FsMh41DAQueKQcFm1aNTcvsjVDiFDyacRMTrP1eG';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getResults(query, maxresults, states) {

  const params = {
    api_key: API,
    q: query,
    stateCode: states,
    limit: maxresults
  };

  if (!params.stateCode) {
    delete params.stateCode;
  }

  const searchString = formatQueryParams(params);
  const url = 'https://developer.nps.gov/api/v1' + '?' + searchString;

  // const options = {
  //   headers: new Headers({
  //     'X-Api-Key': API
  //   })
  // };
  
  fetch(url)
    // .then(response => response.json())
    .then(jsonData => console.log(jsonData))
    .catch(error => alert(error));
}

function searchSubmit() {
  $('form').submit(function(event) {
    event.preventDefault();
    const query = $('.search').val();
    const states = $('.states').val();
    let maxResults = $('.totalResults').val();
    
    if (!maxResults) {
      maxResults = 10;
    }

    getResults(query, maxResults, states);

  });
}

$(searchSubmit);