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
    window.store.sample().then(a => {
      socialNetwork.data.push(...a);
    });
  };

  let formatData = async function() {
    follows.sort();

    follows.map(a => {
      // build formatted dataset from data
      /*
      goal:
      {
        following: <array of Strings>,
        followers:  <array of Strings>,
        tags: <array of Strings>
      }
      */
      // console.log("dataset", dataset);
      // console.log("a", a);
      // console.log("a[0]: ", a[0]);
      // console.log("a[1]: ", a[1]);

      // build dataset step 1: setup structure for ids
      // and populate 'following' list
      if (dataset[a[0]]) {
        if (
          dataset[a[0]].following &&
          dataset[a[0]].following.indexOf(a[1]) < 0
        ) {
          dataset[a[0]].following.push(a[1]);
        }
      } else {
        dataset[a[0]] = {
          followers: [],
          following: [a[1]],
          tags: []
        };
      }

      // build dataset step 2: populate 'followers' list
      if (dataset[a[1]]) {
        if (
          dataset[a[1]].followers &&
          dataset[a[1]].followers.indexOf(a[0]) < 0
        ) {
          dataset[a[1]].followers.push(a[0]);
        }
      } else {
        dataset[a[1]] = {
          following: [],
          followers: [a[0]],
          tags: []
        };
      }
    }); // follows.map()

    // DONE: step 3: populate tags for each key
    for (var key in dataset) {
      dataset[key].tags = await window.store
        .tags(String(key))
        .then(
          function(a) {
            return a[0];
          },
          function(e) {
            console.log("error: ", e.message);
          }
        )
        .catch(function() {
          // TODO do something?
        });
    }

    // step 4: create a separate list for tags
    // represent as horizontal bar plot? or bubble chart?
    // https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
    // it should do the job well: clearly show tag aggregation
    // need to parse/normalise data into this format
    /*
    e.g.
      {
        "@bfeld":         1,
        "@lessig:":       1
        "@mattcharris":   5,
        "@mokoyfman,":    1
      }
      */
    // needs optimisation, currently O[n^3]
    for (const key in dataset) {
      let tagList = dataset[key].tags;
      for (let i = 0, ii = tagList.length; i < ii; i += 1) {
        // remove common typos scattered in tags ':', ','
        let parsedTag = tagList[i].replace(/[;:().,]/gi, "");
        // console.log(parsedTag);
        if (!!tagsAggregate[parsedTag]) {
          // already in list, increment
          tagsAggregate[parsedTag] += 1;
        } else {
          // add to aggregate, count 1
          tagsAggregate[parsedTag] = 1;
        }
      }
    }
    // console.log(tagsAggregate);

    window.socialNetwork.tagsAggregate = tagsAggregate;

    // DEV ONLY
    window.tagsAggregate = tagsAggregate;
    window.dataset = dataset;
  }; // formatData()


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
  }; // makeDisplayContainer

  let renderViews = function() {
    // console.log("renderViews()");
    formatData();
  };

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

try {
  module.exports = vis;
} catch (e) {
  console.warn(e.message);
}

