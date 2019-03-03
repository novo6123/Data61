/*
1. An ADD button that can compose a social network by drawing samples from `store.js`. Repeatedly drawing samples should grow the social network.
2. A CLEAR button that can clear the social network data to restart composing.
3. A visualization of the social network.
4. A visualization of one statistic about the social network: tag frequencies. That is, for the current social network, display the aggregated tag frequencies of the whole network.
*/

function vis() {

  // store data for reuse
  window.socialNetwork = window.socialNetwork || {};
  window.socialNetwork.data = window.socialNetwork.data || [];
  window.socialNetwork.tagsAggregate = {};

  let init = (function() {
    // TODO getData();
    // TODO formatData();
    // TODO addControls();


  })();
}

vis();

module.exports = vis;
