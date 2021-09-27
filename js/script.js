"use strict";

/**
 * Fetches json file and parses it to JS object array
 * @param {*} file
 */
const getJSONData = async (file) => {
  let connections = undefined;
  try {
    const resp = await fetch(file);
    connections = await resp.json();
    hideLoader();
    return connections;
  } catch (error) {
    console.log(`Problem fetching data: ${error}`);
    return null;
  }
};

/**
 *Prepares data for all charts and call Charting function
 * @param {*} connections
 */
function buildGraphs(connections) {
  const responseDist = groupBy(connections, "response_code"),
    requestDist = groupBy(connections, "request", "method"),
    requestPerMin = groupByMinute(connections),
    filteredData = filterByAnswerAndSize(connections),
    histogramData = createHistogramData(filteredData);

  resquestsInfo.innerText =
    getTotalConnectionsPerMinute(connections).toFixed(2);
  buildGraph(
    Object.values(histogramData),
    Object.keys(histogramData),
    histogramChart,
    "Count By Range",
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
 * Hides Loaders animation
 */
function hideLoader() {
  const loaders = document.querySelectorAll("#loader");
  loaders.forEach((loader) => (loader.style.display = "none"));
}

/**
 * Main Entry Point to the JS
 */
async function main() {
  const connections = await getJSONData(file);
  if (connections) buildGraphs(connections);
}

main();
