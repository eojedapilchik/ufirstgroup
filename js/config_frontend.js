const file = "./backend/data_json.json",
  year = 1995, //year of the data
  month = 7, // month of the data
  partitions = 20, // the number of partitions/beans for the graph of the distribution of response_size
  max_bytes_size = 1000, // max size in Bytes of the document
  bean_size = Math.round(max_bytes_size / partitions); // size of each partition for histogram

const defaultColors = [
  "#00429d",
  "#1e68ac",
  "#3b8cbb",
  "#59b2cb",
  "#77d8da",
  "#ffdcce",
  "#ffb7bb",
  "#ff90a7",
  "#ff618f",
  "#ff005e",
];

const respCodeChart = document.getElementById("respCodeChart").getContext("2d"),
  reqMinuteChart = document.getElementById("requestPerMin").getContext("2d"),
  histogramChart = document.getElementById("histogram").getContext("2d"),
  resquestsInfo = document.getElementById("average_request"),
  httpMethodChart = document.getElementById("httpMethodChart").getContext("2d");
