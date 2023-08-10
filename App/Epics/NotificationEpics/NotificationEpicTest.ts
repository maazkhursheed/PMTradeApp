import { sortedMessages } from "~root/Epics/NotificationEpics/index";

test("Notification function tests", () => {
  const listDates = [
    "Fri Apr 16 2021 07:25:23 GMT+0500",
    "Thu Apr 15 2021 07:25:23 GMT+0500",
    "Thu Apr 15 2021 07:25:24 GMT+0500",
    "Thu Apr 15 2021 07:25:23 GMT+0500",
    "Thu Apr 15 2021 07:25:24 GMT+0500",
    "Wed Apr 14 2021 07:25:23 GMT+0500",
    "Tue Apr 13 2021 07:25:23 GMT+0500",
    "Sun Apr 11 2021 07:25:23 GMT+0500",
    "Mon Apr 12 2021 07:25:23 GMT+0500",
    "Sat Apr 10 2021 07:25:23 GMT+0500",
    "Wed Apr 07 2021 07:25:23 GMT+0500",
  ];

  expect(
    sortedMessages(
      listDates.map(val => {
        return { sendDateUtc: val };
      }),
    ),
  ).toEqual([
    { sendDateUtc: "Fri Apr 16 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Thu Apr 15 2021 07:25:24 GMT+0500" },
    { sendDateUtc: "Thu Apr 15 2021 07:25:24 GMT+0500" },
    { sendDateUtc: "Thu Apr 15 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Thu Apr 15 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Wed Apr 14 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Tue Apr 13 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Mon Apr 12 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Sun Apr 11 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Sat Apr 10 2021 07:25:23 GMT+0500" },
    { sendDateUtc: "Wed Apr 07 2021 07:25:23 GMT+0500" },
  ]);
});
