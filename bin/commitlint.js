const request = require("request");
const load = require("@commitlint/load").default;
const lint = require("@commitlint/lint").default;

const TICKET_TYPES = ["bug", "feat", "review", "auto", "task", "refactor", "support", "bump", "other"];
const args = require("minimist")(process.argv.slice(2));

const ARGUMENTS = {
  PR_ID: "pr",
  TOKEN: "token",
};

request.get(
  {
    url: `https://dev.azure.com/fb-gt-appdevelopment/PM.ECommerce/_apis/git/pullrequests/${args[ARGUMENTS.PR_ID]}?api-version=6.0`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(":" + args[ARGUMENTS.TOKEN]).toString("base64"),
    },
  },
  async (err, response, body) => {
    try {
      const result = JSON.parse(body);
      const description = result.description;
      const source = result.sourceRefName;
      const nameSource = result.createdBy.displayName;
      const initials = (function () {
        const split = nameSource.split(/[.\s]/);
        return split[0][0] + split[1][0];
      })().toLowerCase();

      const type = source.split("/")[2];
      const branchNameSplit = source.split("/")[3].split("-");
      const ticket = branchNameSplit[1];
      const name = branchNameSplit[0];

      const isValidType = TICKET_TYPES.includes(type);
      const isValidTicket = ticket.match(/ents\d{4}/) !== null;
      const isValidName = initials === name;
      const loaded = await load();
      const lintMessage = await lint(description, loaded.rules, { plugins: loaded.plugins });

      if (lintMessage.valid) {
        console.log(true);
      } else {
        console.log(isValidType, isValidTicket, isValidName, lintMessage);
      }
    } catch (e) {
      console.log(e);
    }
  },
);
