import CHQEvent from "../../src/lib/chq-event";

test("isLive when the event has not started", () => {
  const startsAt = new Date();
  startsAt.setDate(new Date().getDate() + 5);

  const event = new CHQEvent({ startsAt });

  expect(event.isLive).toBe(false);
});

test("isLive when the event is past the first day", () => {
  const startsAt = new Date();
  startsAt.setDate(new Date().getDate() - 2);

  const event = new CHQEvent({ startsAt });

  expect(event.isLive).toBe(false);
});

test("isLive when the event is within the first day", () => {
  const startsAt = new Date();

  const event = new CHQEvent({ startsAt });

  expect(event.isLive).toBe(true);
});

test("remainingSpots when below cap", () => {
  const event = new CHQEvent({ cap: 5, acceptedCount: 3 });

  expect(event.remainingSpots).toEqual("2 spots remaining");
});

test("remainingSpots when only one spot left", () => {
  const event = new CHQEvent({ cap: 5, acceptedCount: 4 });

  expect(event.remainingSpots).toEqual("1 spot remaining");
});

test("remainingSpots when no spots left", () => {
  const event = new CHQEvent({ cap: 5, acceptedCount: 5 });

  expect(event.remainingSpots).toEqual("No spots remaining");
});
