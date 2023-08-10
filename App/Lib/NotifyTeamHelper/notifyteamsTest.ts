var { ticketNumbers } = require("./index");
const execSync = require("child_process").execSync;

describe("Get Ticket Number", () => {
  const expectedTicktetNumber = `ENTS-2773,ENTS-2808,ENTS-2791,ENTS-2794,ENTS-2785`;
  test("get ticket number", async () => {
    let logResponse = `Merge-branch-SIT-of-https-fb-gt-appdevelopment.visualstudio.com-PM.ECommerce-_git-PM.ECommerce.MobileApps-into-task-dk-ents2685-releasenotes
    Merged-PR-12856-bug-22.5.1-ENTS-2773
    Merged-PR-12846-Crashing
    Merged-PR-12858-bug-22.5.1-ENTS-2808
    Merged-PR-12819-update-and-display-issue-of-quote-product-quantity-for-timber-product
    Merged-PR-12832-bug-22.5.1-ENTS-2791
    Merged-PR-12834-bug-22.5.1-ENTS-2794
    Merged-PR-12835-bug-22.5.1-ENTS-2785
    Extra-code-removed
    Updated-script-for-release-notes`;
    const tickerNumber = ticketNumbers(logResponse);
    // need this replace method as the string coming from ticketNumbers will contain spaces
    expect(tickerNumber).toEqual(expectedTicktetNumber);
  });

  test("ticket numbers to be empty or null", async () => {
    let logResponse = null;
    const tickerNumber = ticketNumbers(logResponse);
    expect(tickerNumber).toBeNull();
  });
});
