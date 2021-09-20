const file = window.location.origin + "/data_json.json";
const year = 1995; //year of the data
const month = 7; // month of the data
const partitions = 20; // the number of partitions/beans for the graph of the distribution of response_size
const max_bytes_size = 1000; // max size in Bytes of the document
const bean_size = Math.round(max_bytes_size / partitions); // size of each partition for histogram
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
console.log(window.location.pathname);
