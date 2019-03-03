/*
1. An ADD button that can compose a social network by drawing samples from `store.js`. Repeatedly drawing samples should grow the social network.
2. A CLEAR button that can clear the social network data to restart composing.
3. A visualization of the social network.
4. A visualization of one statistic about the social network: tag frequencies. That is, for the current social network, display the aggregated tag frequencies of the whole network.
*/

function vis() {
  "use strict";

  // store data for reuse
  window.socialNetwork = window.socialNetwork || {};
  window.socialNetwork.data = window.socialNetwork.data || [];
  window.socialNetwork.tagsAggregate = {};

  const VIS_ID = {
    RELATIONSHIPS: "relationshipsVisual",
    TAGS: "tagsVisual",
    TABLE: "table"
  };

  let getData = function() {
    console.log("getData()");
  }

  let formatData = function() {
    console.log("formatData()");
  }

  let addControls = function() {
    // button parent
    let buttonWrapper = document.createElement("div");
    buttonWrapper.className += "buttonWrapper ";

    let buttonElem = {};
    let buttonMaker = (label, callback) => {
      buttonElem = document.createElement("button");
      buttonElem.innerText = label;
      buttonElem.addEventListener("click", callback);
      buttonWrapper.appendChild(buttonElem);
    };

    // add button
    buttonMaker("Add", () => {
      getData();
      clearViews();
      renderViews();
    });

    // clear button
    buttonMaker("Clear", () => {
      console.log("Clear socialNetwork.data");
      window.socialNetwork = {};
      window.dataset = {};
      window.tagsAggregate = {};
      clearViews();
    });

    document.body.appendChild(buttonWrapper);
  }; // addControls

  let clearViews = function() {
    for (var key in VIS_ID) {
      document.getElementById(VIS_ID[key]).innerHTML = "";
      document.getElementById(VIS_ID[key]).remove();
    }
    makeDisplayContainer();
  };

  let makeDisplayContainer = function() {
    for (var key in VIS_ID) {
      let displayWrapper = document.createElement("div");
      displayWrapper.className += "displayWrapper " + VIS_ID[key];

      displayWrapper.id = VIS_ID[key];
      document.body.appendChild(displayWrapper);
    }

    // DEV
    // DO I NEED THIS HERE?
    // let displaySVG = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "svg"
    // );
    // displaySVG.setAttribute("width", 400);
    // displaySVG.setAttribute("height", 400);

    // displayWrapper.appendChild(displaySVG);
    // displayWrapper.id = VIS_ID.RELATIONSHIPS;
    // document.body.appendChild(displayWrapper);
  }; // makeDisplayContainer

  let renderViews = function() {
    console.log("renderViews()");
  }

  let init = (function() {
    getData();
    formatData();
    addControls();
    makeDisplayContainer();

    // DEV
    getData();
    clearViews();
    renderViews();
  })();
}

vis();

module.exports = vis;
