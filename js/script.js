"use strict";
const respCodeChart = document.getElementById("respCodeChart").getContext("2d");
const reqMinuteChart = document
  .getElementById("requestPerMin")
  .getContext("2d");
const histogramChart = document.getElementById("histogram").getContext("2d");
const resquestsInfo = document.getElementById("average_request");
const httpMethodChart = document
  .getElementById("httpMethodChart")
  .getContext("2d");

/**
 * Fetches json file and parses it to JS object array
 * @param {*} file
 */
function getJSONData(file) {
  fetch(file)
    .then((resp) => {
      //console.log(resp);
      if (!resp.ok) throw new Error(`Data is not available ${resp.status}`);
      return resp.json();
    })
    .then((connections) => {
      hideLoader();
      buildGraphs(connections);
    })
    .catch((e) => console.log(`Problem fetching data: ${e.message}`));
}

/**
 *Prepares data for all charts and call Charting function
 * @param {*} connections
 */
function buildGraphs(connections) {
  const responseDist = groupBy(connections, "response_code");
  const requestDist = groupBy(connections, "request", "method");
  const requestPerMin = groupByMinute(connections);
  const filteredData = filterByAnswerAndSize(connections);
  const histogramData = createHistogramData(filteredData);
  resquestsInfo.innerText =
    getTotalConnectionsPerMinute(connections).toFixed(2);
  buildGraph(
    Object.values(histogramData),
    Object.keys(histogramData),
    histogramChart,
    "Size in Bytes",
    undefined,
    "bar"
  );
  buildGraph(
    Object.values(requestPerMin),
    Object.keys(requestPerMin),
    reqMinuteChart,
    "Requests Per Minute",
    undefined,
    "line"
  );
  buildGraph(
    Object.values(requestDist),
    Object.keys(requestDist),
    httpMethodChart,
    "HTTP Method Dist.",
    ["#00429d", "#4a9fc3", "#ffa4b2", "#ff005e"],
    "doughnut"
  );
  buildGraph(
    Object.values(responseDist),
    Object.keys(responseDist),
    respCodeChart,
    "Response Codes Dist.",
    undefined,
    "bar"
  );
}

/**
 * Groupbs by a List of Objexts by keys
 * @param {*} array
 * @param {*} key1
 * @param {*} key2
 * @returns
 */
function groupBy(array, key1, key2 = null) {
  let grouped_array = array.reduce(function (x, conn) {
    if (key2) {
      x[conn[key1][key2]] = x[conn[key1][key2]] + 1 || 1;
    } else {
      x[conn[key1]] = x[conn[key1]] + 1 || 1;
    }

    return x;
  }, {});
  return grouped_array;
}

/**
 * Groups a list of request objects by minutes
 * @param {*} array
 * @returns
 */
function groupByMinute(array) {
  let grouped_array = array.reduce(function (x, conn) {
    const key = `${conn.datetime.day}-${conn.datetime.hour}h-${conn.datetime.minute}m`;
    x[key] = x[key] + 1 || 1;
    return x;
  }, {});
  return grouped_array;
}

/**
 * Calculates de Total connectios Per minute
 * @param {*} connections
 * @returns
 */
function getTotalConnectionsPerMinute(connections) {
  let dates = connections
    .map(function (conn) {
      return new Date(
        year,
        month,
        conn.datetime.day,
        conn.datetime.hour,
        conn.datetime.minute,
        conn.datetime.second
      );
    })
    .sort((a, b) => a - b);
  const minutes = (dates[dates.length - 1] - dates[0]) / 1000 / 60; //Milliseconds/Seconds/Minutes
  return connections.length / minutes;
}

/**
 * Filters array of objects based on responde_code and document_size
 * @param {*} connections
 * @returns filtered array according to conditions
 */
function filterByAnswerAndSize(connections) {
  let filtered = connections
    .filter(
      (conn) =>
        parseInt(conn.response_code) === 200 &&
        parseInt(conn.document_size) <= max_bytes_size
    )
    .map((conn) => parseInt(conn.document_size))
    .sort((a, b) => a - b);
  return filtered;
}

/**
 * Histogram data for  document_size
 * @param {*} raw_data
 * @returns
 */
function createHistogramData(raw_data) {
  const data_beans = {};
  for (let i = 0; i < partitions; i++) {
    const min = i * bean_size;
    const max = i * bean_size + bean_size;

    data_beans[`${min} - ${max}`] = raw_data.filter(
      (data) => data >= min && data < max
    ).length;
  }
  return data_beans;
}

/**
 * Creates a Chart
 * @param {Array} data to be used
 * @param {Array String} labels for axis
 * @param {DOM element} domChart the HTML canvas element where the charts if going to be rendered
 * @param {String} label for data series
 * @param {Array String} colors for background colors of the bars,pie sectionsm...
 * @param {String} type of chart
 * @returns chart.js object
 */
function buildGraph(
  data,
  labels,
  domChart,
  label,
  colors = defaultColors,
  type = "bar"
) {
  return new Chart(domChart, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: colors,
          borderWidth: 2,
          hoverBorderWidth: 4,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

/**
 * Generates and Array of random hex Colors
 * @param {integer} quantity of colors to generate
 * @return {Array string} hex colors
 */
function getRandomColorsForGraph(quantity) {
  const colors = [];
  for (let i = 0; i < quantity; i++) {
    colors.push(getRandomColorHex());
  }
  return colors;
}

/**
 * Creates one random color in hex format
 * @returns {String} color in hex format
 */
function getRandomColorHex() {
  var hex = "0123456789ABCDEF",
    color = "#";
  for (var i = 1; i <= 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Hides Loaders animation
 */
function hideLoader() {
  const loaders = document.querySelectorAll("#loader");
  loaders.forEach((loader) => (loader.style.display = "none"));
}

/**
 * Main Entry Point to the JS
 */
getJSONData(file);
