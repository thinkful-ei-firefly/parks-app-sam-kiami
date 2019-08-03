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
  const url = 'https://developer.nps.gov/api/v1/parks' + '?' + searchString;
  
  fetch(url)
    .then(response => response.json())
    .then(res => res.data.map(park => {
      return (`
        <h3>${park.fullName}</h3>
        <p>${park.description}</p>
        <a href="${park.url}">Park Website</a>
      `)
    }))
    .then(res => $('.results').html(res))
    .catch(error => alert(error));
}

function searchSubmit() {
  $('form').submit(function(event) {
    event.preventDefault();
    const query = $('.search').val();
    const states = $('.states').val();
    let maxResults = $('.totalResults').val();
    $('.search').val('');
    $('.states').val('');
    $('.totalResults').val('');

    if (!maxResults) {
      maxResults = 10;
    }

    getResults(query, maxResults, states);

  });
}

$(searchSubmit);