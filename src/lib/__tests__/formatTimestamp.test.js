import formatTimestamp from "../formatTimestamp";

const format = (delta) => formatTimestamp(Date.UTC(0) + delta);

test("displays month correctly", () => {
  const formatted = format(6 * 30 * 24 * 60 * 60 * 1000);

  expect(formatted).toEqual("June 30, 1900, 12:00 AM");
});

test("handles midnight", () => {
  const formatted = format(0);

  expect(formatted).toEqual("January 1, 1900, 12:00 AM");
});

test("handles AM/PM switch", () => {
  const formatted = format(14 * 60 * 60 * 1000);

  expect(formatted).toEqual("January 1, 1900, 2:00 PM");
});
