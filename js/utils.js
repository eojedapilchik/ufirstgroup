/**
 * Groupbs a List of Objects by Objects keys
 * @param {*} array
 * @param {*} key1
 * @param {*} key2
 * @returns
 */
const groupBy = (array, key1, key2 = null) => {
  if (!array || array.length === 0) return { undefined: 0 };
  return array.reduce(function (x, conn) {
    if (key2) {
      x[conn?.[key1]?.[key2]] = x[conn?.[key1]?.[key2]] + 1 || 1;
    } else {
      x[conn[key1]] = x[conn[key1]] + 1 || 1;
    }
    return x;
  }, {});
};

/**
 * Groups a list of request objects by minutes
 * @param {*} array
 * @returns
 */
const groupByMinute = (array) => {
  return (grouped_array = array.reduce(function (x, conn) {
    const key = `${conn.datetime.day}-${conn.datetime.hour}h-${conn.datetime.minute}m`;
    x[key] = x[key] ? x[key] + 1 : 1;
    return x;
  }, {}));
};

/**
 * Calculates de Total connections Per minute
 * @param {*} connections
 * @returns
 */
const getTotalConnectionsPerMinute = (connections) => {
  const dates = connections
    .map(
      (conn) =>
        new Date(
          year,
          month,
          conn.datetime.day,
          conn.datetime.hour,
          conn.datetime.minute,
          conn.datetime.second
        )
    )
    .sort((a, b) => a - b);
  const minutes = (dates[dates.length - 1] - dates[0]) / 1000 / 60; //Milliseconds/Seconds/Minutes
  return connections.length / minutes;
};

/**
 * Filters array of objects based on responde_code and document_size
 * @param {*} connections
 * @returns filtered array according to conditions
 */
const filterByAnswerAndSize = (connections) => {
  return connections
    .filter(
      (conn) =>
        parseInt(conn.response_code) === 200 &&
        parseInt(conn.document_size) <= max_bytes_size
    )
    .map((conn) => parseInt(conn.document_size))
    .sort((a, b) => a - b);
};

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

module.exports = {
  groupBy,
};
