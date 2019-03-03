function vis() {
  "use strict";

  const VIS_ID = {
    RELATIONSHIPS: "relationshipsVisual",
    TAGS: "tagsVisual",
    TABLE: "table"
  };

  const VIS = {
    width: 280,
    height: 480,
    bar: {
      colorFill: "#222",
      colorText: "#eee"
    }
  };

  // store data for reuse
  window.socialNetwork = window.socialNetwork || {};
  window.socialNetwork.data = window.socialNetwork.data || [];
  window.socialNetwork.tagsAggregate = {};

  /*
   * @function renderTable
   * @desc add table data to DOM
   */
  let renderTable = function() {

    // insert label
    let label = document.createElement("h3");
    label.innerText = "tabulated data";
    document.getElementById(`${VIS_ID.TABLE}`).appendChild(label);

    let tableWrapper = document.createElement("div");
    tableWrapper.className += "tableWrapper ";

    // render 'dataset'
    let dataTable = document.createElement("table");
    let dataTr = document.createElement("tr");
    let dataTh = document.createElement("th");

    // set up headers
    ["id", "following", "followers", "tags"].map(a => {
      dataTh = document.createElement("th");
      dataTh.innerText = a;
      dataTh.className += a;
      dataTr.appendChild(dataTh);
    });
    dataTable.appendChild(dataTr);

    for (let key in dataset) {
      // console.log(key, dataset[key]);
      dataTr = document.createElement("tr");

      let dataTd;

      // id
      dataTd = document.createElement("td");
      dataTd.innerText = String(key);
      dataTd.className += "id";
      dataTr.appendChild(dataTd);

      dataTd = document.createElement("td");
      dataTd.innerText = dataset[key].following
        .toString()
        .split(",")
        .join(", ");
      dataTd.className += "following";
      dataTr.appendChild(dataTd);

      dataTd = document.createElement("td");
      dataTd.innerText = dataset[key].followers
        .toString()
        .split(",")
        .join(", ");
      dataTd.className += "followers";
      dataTr.appendChild(dataTd);

      dataTd = document.createElement("td");
      dataTd.className += "tags";
      dataTd.innerText =
        dataset[key].tags && dataset[key].tags.length > 0
          ? dataset[key].tags.join(", ")
          : "";

      dataTr.appendChild(dataTd);

      dataTable.appendChild(dataTr);
    }
    document.getElementById(`${VIS_ID.TABLE}`).appendChild(dataTable);
  }; // renderTable

  /*
   * @function renderRelationshipVis
   * @desc render HTML elements containing IDs
   */
  let renderRelationshipVis = function() {
    let visElem = document.getElementById(`${VIS_ID.RELATIONSHIPS}`);

    // insert label
    let label = document.createElement("h3");
    label.innerText = "relationships";
    visElem.appendChild(label);

    let clusterWrapper = document.createElement("div");
    clusterWrapper.className += "clusterWrapper ";
    let cluster, target, targetFollower, targetFollowing;
    /*
    goal:
    <div class="cluster">
        <div class="targetFollowing">23</div>
        <div class="targetFollowing">92110</div>
        <div class="targetFollowing">84399</div>

        <div class="target">295</div>

        <div class="targetFollower">1234</div>
        <div class="targetFollower">30402</div>
    </div>
    */

    for (var key in dataset) {
      // console.log(dataset[key]);
      cluster = document.createElement("div");
      cluster.className += "cluster ";

      // targetFollowing
      for (let i = 0, ii = dataset[key].following.length; i < ii; i += 1) {
        let widthClass = "w" + String(Math.floor(1000 / ii));
        targetFollowing = document.createElement("div");
        targetFollowing.className += "targetFollowing " + widthClass;
        // console.log((i + 1) / ii);

        // add title for extra info on hover, in case overflow/occlusion occurs
        targetFollowing.title = dataset[key].following[i];
        targetFollowing.innerText = dataset[key].following[i];
        cluster.appendChild(targetFollowing);
      }

      // target
      target = document.createElement("div");
      target.className += "target ";
      target.innerText = key;
      cluster.appendChild(target);

      // targetFollowers
      for (let i = 0, ii = dataset[key].followers.length; i < ii; i += 1) {
        let widthClass = "w" + String(Math.floor(1000 / ii));
        targetFollower = document.createElement("div");
        targetFollower.className += "targetFollower " + widthClass;

        // add title for extra info on hover, in case overflow/occlusion occurs
        targetFollower.title = dataset[key].followers[i];
        targetFollower.innerText = dataset[key].followers[i];
        cluster.appendChild(targetFollower);
      }

      clusterWrapper.appendChild(cluster);
    }

    visElem.appendChild(clusterWrapper);
  };

  /*
   * @function renderTagVis
   * @desc render tags in vertical D3 bar chart
   */
  let renderTagVis = function() {
    // console.log("renderTagVis()");

    // insert label
    let label = document.createElement("h3");
    label.innerText = "tags";
    document.getElementById(`${VIS_ID.TAGS}`).appendChild(label);

    const V_SCALE = 20; // seems to be reasonable for displaying lots of tags
    const H_SCALE = 120;
    // Math.max(tagsValue) + 10;
    // TODO set H_SCALE dynamically

    // console.log(V_SCALE, H_SCALE);

    let tagsList = [];
    let tagsValue = [];

    for (var key in socialNetwork.tagsAggregate) {
      tagsList.push(key);
      tagsValue.push(socialNetwork.tagsAggregate[key]);
    }
    // tagsList.sort();
    // console.log(tagsList);

    var margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 120 // allow room for tag labels
      },
      width = VIS.width, // TODO adjust height dynamically. Scrollable?
      height = V_SCALE * tagsList.length - margin.top - margin.bottom;

    var svg = d3
      .select(`#${VIS_ID.TAGS}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([0, H_SCALE])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        tagsList.map(function(a) {
          return a;
          // console.log(a);
          // return d.Country;
        })
      )
      .padding(0.2);

    svg
      .append("g")
      .call(d3.axisLeft(y));

    // add bars
    svg
      .append("g")
      .selectAll("rect")
      .data(tagsList)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function(a) {
        return y(a);
      })
      .attr("width", function(a) {
        return x(socialNetwork.tagsAggregate[a]);
      })
      .attr("height", y.bandwidth());

    // add labels
    // Needs debugging
    // svg
    //   .selectAll("rect")
    //   .append("text")
    //   .attr("x", x(0))
    //   // .attr("x", function(a) {
    //   //   // console.log("a: ", socialNetwork.tagsAggregate[a]);
    //   //   return x(socialNetwork.tagsAggregate[a]);
    //   // })
    //   // .attr("y", 0)
    //   .attr("y", function(a) {
    //     console.log("y: ", socialNetwork.tagsAggregate[a]);
    //     return y(socialNetwork.tagsAggregate[a]);
    //   })
    //   // .attr("y", barHeight / 2)
    //   // .attr("dy", ".35em")
    //   .attr("dy", ".5rem")
    //   .text(function(a) {
    //     return socialNetwork.tagsAggregate[a];
    //     // console.log(a);
    //     // return "foo";
    //     // return a;
    //   })
    //   .attr("fill", VIS.bar.colorText)
    //   .attr("class", "barLabel");
  }; // renderTagVis()

  /*
   * @function renderViews
   * @desc format data, render views
   */
  let renderViews = function() {
    // console.log("renderViews()");
    formatData();
    renderTagVis();
    renderRelationshipVis();

    // WIP
    renderTable();
  };

  /*
   * @function clearViews
   * @desc buggy at the moment :(
   * TODO debug
   */
  let clearViews = function() {
    for (var key in VIS_ID) {
      document.getElementById(VIS_ID[key]).innerHTML = "";
      document.getElementById(VIS_ID[key]).remove();
    }
    makeDisplayContainer();
  };

  /*
   * @function getData
   * @desc get data from store.sample promise
   */
  let getData = function() {
    window.store.sample().then(a => {
      socialNetwork.data.push(...a);
    });
  };

  /*
   * @function addControls
   * @desc create buttons and add to DOM
   */
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
      // console.log("Clear socialNetwork.data");
      window.socialNetwork = {};
      window.dataset = {};
      window.tagsAggregate = {};
      clearViews();
    });

    document.body.appendChild(buttonWrapper);
  }; // addControls

  /*
   * @function makeDisplayContainer
   * @desc create HTML elems from list
   */
  let makeDisplayContainer = function() {
    for (var key in VIS_ID) {
      let displayWrapper = document.createElement("div");
      displayWrapper.className += "displayWrapper " + VIS_ID[key];

      displayWrapper.id = VIS_ID[key];
      document.body.appendChild(displayWrapper);
    }
  }; // makeDisplayContainer

  let follows = socialNetwork.data;
  let dataset = {};
  let tagsAggregate = {};

  /*
   * @function formatData
   * @desc format data from store.sample() promise, using async-await
   */
  let formatData = async function() {
    follows.sort();

    follows.map(a => {
      // build formatted dataset from data
      /*
      goal:
      {
        following: <array of Strings>,
        followers:  [array of Strings],
        tags: <array of Strings>
      }
      */

      // build dataset: setup structure for ids
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

      // populate 'followers' list
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

    // populate tags for each key
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
          // TODO do something? handle error?
        });
    }

    // step 4: create a separate list for tags
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

  }; // formatData()

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
