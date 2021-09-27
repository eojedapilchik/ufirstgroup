const { groupBy } = require("../js/utils");
const {
  test_1object_list,
  test_m_object_result,
  test_m_object_list_in,
  test_in_missing_keys,
  test_out_missing_keys,
  test_m_object_result_2,
  test_out_missing_keys_2,
  test_in_missing_keys_2,
  test_1bad_object,
} = require("./data");

describe("Tests GroupBy with 1st level key:", () => {
  test("with only 1 object in array ", () => {
    // prettier-ignore
    const result = {
      "200": 1,
    };
    expect(groupBy(test_1object_list, "response_code")).toHaveProperty("200");
    expect(groupBy(test_1object_list, "response_code")).toStrictEqual(result);
  });

  test("with many objects in array ", () => {
    // prettier-ignore
    const result = {
      "200": 1,
    };
    expect(groupBy(test_m_object_list_in, "response_code")).toHaveProperty(
      "200"
    );
    expect(groupBy(test_m_object_list_in, "response_code")["500"]).toBe(2);
    expect(groupBy(test_m_object_list_in, "response_code")).toStrictEqual(
      test_m_object_result
    );
  });

  test("with many empty objects in array ", () => {
    const input = [{}, {}, {}];
    const output = { undefined: 3 };
    expect(groupBy(input, "response_code")).toStrictEqual(output);
  });

  test("with many objects with missing keys in the array ", () => {
    expect(groupBy(test_in_missing_keys, "response_code")).toStrictEqual(
      test_out_missing_keys
    );
  });

  test("with one empty object in the array ", () => {
    const input = [{}];
    const output = { undefined: 1 };
    expect(groupBy(input, "response_code")).toStrictEqual(output);
  });

  test("with an empty array - no objects", () => {
    const input = [];
    const output = { undefined: 0 };
    expect(groupBy(input, "response_code")).toStrictEqual(output);
  });

  test("using undefined input instead of array", () => {
    const input = undefined;
    const output = { undefined: 0 };
    expect(groupBy(input, "response_code")).toStrictEqual(output);
  });

  test("array of objects with non existant keys", () => {
    const result = {
      undefined: 8,
    };
    expect(groupBy(test_m_object_list_in, "non_existant")).toHaveProperty(
      "undefined"
    );
    expect(groupBy(test_m_object_list_in, "non_existant")["undefined"]).toBe(8);
    expect(groupBy(test_m_object_list_in, "non_existant")).toStrictEqual(
      result
    );
  });

  test("with malformed objects in the array - no primitive values for keys", () => {
    // prettier-ignore
    const result = {
      "[object Object]": 1,
      "200,200": 1,
    };
    expect(groupBy(test_1bad_object, "response_code")).toStrictEqual(result);
  });
});

describe("Tests GroupBy with 2nd level key: ", () => {
  test("with 1 object in the array ", () => {
    // prettier-ignore
    const result = {
        GET: 1,
      };
    expect(groupBy(test_1object_list, "request", "method")).toStrictEqual(
      result
    );
  });

  test("with many objects in the array ", () => {
    // prettier-ignore
    expect(groupBy(test_m_object_list_in, "request", "method")).toHaveProperty(
      "PUT"
    );
    expect(groupBy(test_m_object_list_in, "request", "method")["PUT"]).toBe(1);
    expect(groupBy(test_m_object_list_in, "request", "method")).toStrictEqual(
      test_m_object_result_2
    );
  });

  test("with many empty objects in the array ", () => {
    const input = [{}, {}, {}];
    const output = { undefined: 3 };
    expect(groupBy(input, "request", "method")).toStrictEqual(output);
  });

  test("with many objects missing 2 key in the array ", () => {
    expect(groupBy(test_in_missing_keys, "request", "method")).toStrictEqual(
      test_out_missing_keys_2
    );
  });

  test("with many objects missing 1st or 2nd keys in the array ", () => {
    expect(groupBy(test_in_missing_keys_2, "request", "method")).toStrictEqual(
      test_out_missing_keys_2
    );
  });

  test("with one empty object in the array ", () => {
    const input = [{}];
    const output = { undefined: 1 };
    expect(groupBy(input, "response_code")).toStrictEqual(output);
  });

  test("with an empty array", () => {
    const input = [];
    const output = { undefined: 0 };
    expect(groupBy(input, "response_code")).toStrictEqual(output);
  });

  test("passing undefined instead of an array", () => {
    const input = undefined;
    const output = { undefined: 0 };
    expect(groupBy(input, "response_code")).toStrictEqual(output);
  });

  test("with objects including non-existant keys", () => {
    const result = {
      undefined: 8,
    };
    expect(
      groupBy(test_m_object_list_in, "non_existant", "method")
    ).toHaveProperty("undefined");
    expect(
      groupBy(test_m_object_list_in, "non_existant", "method")["undefined"]
    ).toBe(8);
    expect(
      groupBy(test_m_object_list_in, "non_existant", "method")
    ).toStrictEqual(result);
  });
});
