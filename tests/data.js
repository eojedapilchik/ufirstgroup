exports.test_1object_list = [
  {
    host: "141.243.1.172",
    datetime: { day: "29", hour: "23", minute: "53", second: "25" },
    request: {
      method: "GET",
      url: "/Software.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "200",
    document_size: "1497",
  },
];

exports.test_1bad_object = [
  {
    host: "141.243.1.172",
    datetime: { day: "29", hour: "23", minute: "53", second: "25" },
    request: {
      method: "GET",
      url: "/Software.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: { value: 200 },
    document_size: "1497",
  },
  {
    host: "141.243.1.172",
    datetime: { day: "29", hour: "23", minute: "53", second: "25" },
    request: {
      method: "GET",
      url: "/Software.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: [200, 200],
    document_size: "1497",
  },
];

exports.test_m_object_list_in = [
  {
    host: "141.243.1.172",
    datetime: { day: "29", hour: "23", minute: "53", second: "25" },
    request: {
      method: "GET",
      url: "/Software.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "200",
    document_size: "1497",
  },
  {
    host: "query2.lycos.cs.cmu.edu",
    datetime: { day: "29", hour: "23", minute: "53", second: "36" },
    request: {
      method: "HEAD",
      url: "/Consumer.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "200",
    document_size: "1325",
  },
  {
    host: "tanuki.twics.com",
    datetime: { day: "29", hour: "23", minute: "53", second: "53" },
    request: {
      method: "GET",
      url: "/News.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "400",
    document_size: "1014",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "15" },
    request: {
      method: "GET",
      url: "/",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "400",
    document_size: "4889",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "16" },
    request: {
      method: "POST",
      url: "/icons/circle_logo_small.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "302",
    document_size: "2624",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "18" },
    request: {
      method: "PUT",
      url: "/logos/small_gopher.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "500",
    document_size: "935",
  },
  {
    host: "140.112.68.165",
    datetime: { day: "29", hour: "23", minute: "54", second: "19" },
    request: {
      method: "POST",
      url: "/logos/us-flag.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "500",
    document_size: "2788",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "19" },
    request: {
      method: "GET",
      url: "/logos/small_ftp.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "200",
    document_size: "124",
  },
];

exports.test_m_object_result = {
  200: 3,
  400: 2,
  302: 1,
  500: 2,
};

exports.test_m_object_result_2 = {
  GET: 4,
  POST: 2,
  PUT: 1,
  HEAD: 1,
};

exports.test_in_missing_keys = [
  {
    host: "141.243.1.172",
    datetime: { day: "29", hour: "23", minute: "53", second: "25" },
    request: {
      url: "/Software.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "200",
    document_size: "1497",
  },
  {
    host: "query2.lycos.cs.cmu.edu",
    datetime: { day: "29", hour: "23", minute: "53", second: "36" },
    request: {
      url: "/Consumer.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "200",
    document_size: "1325",
  },
  {
    host: "tanuki.twics.com",
    datetime: { day: "29", hour: "23", minute: "53", second: "53" },
    request: {
      method: "GET",
      url: "/News.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "400",
    document_size: "1014",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "15" },
    request: {
      url: "/",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "400",
    document_size: "4889",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "16" },
    request: {
      url: "/icons/circle_logo_small.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "2624",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "18" },
    request: {
      method: "PUT",
      url: "/logos/small_gopher.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "935",
  },
  {
    host: "140.112.68.165",
    datetime: { day: "29", hour: "23", minute: "54", second: "19" },
    request: {
      method: "POST",
      url: "/logos/us-flag.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "2788",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "19" },
    request: {
      method: "GET",
      url: "/logos/small_ftp.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "124",
  },
];

exports.test_in_missing_keys_2 = [
  {
    host: "141.243.1.172",
    datetime: { day: "29", hour: "23", minute: "53", second: "25" },
    response_code: "200",
    document_size: "1497",
  },
  {
    host: "query2.lycos.cs.cmu.edu",
    datetime: { day: "29", hour: "23", minute: "53", second: "36" },
    response_code: "200",
    document_size: "1325",
  },
  {
    host: "tanuki.twics.com",
    datetime: { day: "29", hour: "23", minute: "53", second: "53" },
    request: {
      method: "GET",
      url: "/News.html",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "400",
    document_size: "1014",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "15" },
    request: {
      url: "/",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    response_code: "400",
    document_size: "4889",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "16" },
    request: {
      url: "/icons/circle_logo_small.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "2624",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "18" },
    request: {
      method: "PUT",
      url: "/logos/small_gopher.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "935",
  },
  {
    host: "140.112.68.165",
    datetime: { day: "29", hour: "23", minute: "54", second: "19" },
    request: {
      method: "POST",
      url: "/logos/us-flag.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "2788",
  },
  {
    host: "wpbfl2-45.gate.net",
    datetime: { day: "29", hour: "23", minute: "54", second: "19" },
    request: {
      method: "GET",
      url: "/logos/small_ftp.gif",
      protocol: "HTTP",
      protocol_version: "1.0",
    },
    document_size: "124",
  },
];

exports.test_out_missing_keys = { 200: 2, 400: 2, undefined: 4 };
exports.test_out_missing_keys_2 = { PUT: 1, POST: 1, GET: 2, undefined: 4 };
