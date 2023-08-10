import R from "ramda";
import { fetchHybrisJobs, fetchJobs, showJobAddress, showJobSearchName } from "~root/Lib/JobAccountsHelper";
import { ExpectedHybrisJobs, HybrisJobs } from "~root/Lib/SampleResponses";

const jobAccount = {
  JobNumber: "A1COR001",
  JobName: "Nathan Douglas",
  SearchName: "Nathan Douglas",
  Address1: "Nathan Douglas",
  Address2: "20 Mataura Road",
};

const jobs = {
  Customer: {
    Jobs: [
      {
        JobNumber: "A1COR000",
        JobName: "Wilde & Cartwrig",
        SearchName: "Wilde & Cartwrig",
        Address1: "Wilde & Cartwright",
        Address2: "215B Rangi Avenue",
      },
      {
        JobNumber: "A1COR001",
        JobName: "Nathan Douglas",
        SearchName: "Nathan Douglas",
        Address1: "Nathan Douglas",
        Address2: "20 Mataura Road",
      },
      {
        JobNumber: "A1COR002",
        JobName: "Angela & Kevin J",
        SearchName: "Angela & Kevin J",
        Address1: "Angela & Kevin Jane",
        Address2: "LotNo 4",
      },
      {
        JobNumber: "A1COR003",
        JobName: "Home and Bach Construction Limited t/a A1 Homes - Coromandel",
        SearchName: "Jane Extra",
        Address1: "",
        Address2: "",
      },
    ],
  },
};

test("returns concatenated string of two address fields separated by comma, empty if both are absent", () => {
  expect(showJobAddress(jobAccount)).toBe("Nathan Douglas, 20 Mataura Road");
  expect(showJobAddress(R.assoc("Address1", "", jobAccount))).toBe("20 Mataura Road");
  expect(showJobAddress(R.assoc("Address2", "", jobAccount))).toBe("Nathan Douglas");
  expect(showJobAddress(R.assoc("Address2", "", R.assoc("Address1", "", jobAccount)))).toBe("");
});

test("returns job search name", () => {
  expect(showJobSearchName(jobAccount)).toBe(R.prop("SearchName", jobAccount));
  expect(showJobSearchName(R.assoc("SearchName", "", jobAccount))).toBe(R.prop("JobName", jobAccount));
  expect(showJobSearchName(R.assoc("JobName", "", R.assoc("SearchName", "", jobAccount)))).toBe("");
});

test("returns list of job accounts", () => {
  expect(fetchJobs(jobs)).toStrictEqual(R.path(["Customer", "Jobs"], jobs));
  expect(fetchJobs(R.assocPath(["Customer", "Jobs"], undefined, jobs))).toBe(undefined);
  expect(fetchJobs(R.assocPath(["Customer", "Jobs"], [], jobs))).toStrictEqual([]);
});

test("test fetch hybris job", () => {
  expect(fetchHybrisJobs(HybrisJobs)).toStrictEqual(ExpectedHybrisJobs);
});
