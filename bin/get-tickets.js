const execSync = require("child_process").execSync;
const { ticketNumbers } = require("../App/Lib/NotifyTeamHelper");
const ARGUMENTS = {
  ENVIRONMENT: "env",
};

(async function getTickets() {
  const args = require("minimist")(process.argv.slice(2));

  const env = args[ARGUMENTS.ENVIRONMENT];

  const tag = env === "prod" ? "pvt" : env === "bau" ? "release" : env;

  const secondLastTag = execSync(`git describe --match "${tag}-*" --abbrev=0 --tags $(git rev-list --tags --skip=1 --max-count=1 --abbrev=0)`);

  const command = `git log ${secondLastTag}..HEAD --pretty="format:%s%n%b" --grep="ENTS-"`.replace(/(\r\n|\n|\r)/gm, "");

  const logResponse = execSync(command);

  const tickets = ticketNumbers(logResponse);

  console.log(tickets);
})();
