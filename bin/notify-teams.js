const moment = require("moment");
const request = require("request");
const execSync = require("child_process").execSync;
const { ticketNumbers } = require("../App/Lib/NotifyTeamHelper");

const ARGUMENTS = {
  VERSION_NAME: "vname",
  VERSION_CODE_IOS: "vcodeios",
  VERSION_CODE_ANDROID: "vcodeandroid",
  TEAMS_WEBHOOK_URL: "url",
  TICKETS_NUMBER: "tickets",
  ENVIRONMENT: "env",
  JIRA_TOKEN: "jiratoken",
};

const provideAsync = (method, obj) =>
  new Promise((resolve, reject) => {
    if (method === "GET") {
      request.get(obj, function (error, response, body) {
        if (error || !body) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
      });
    } else if (method === "POST") {
      request.post(obj, function (error, response, body) {
        if (error || !body) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
      });
    }
  });

(async function notifyTeams() {
  const args = require("minimist")(process.argv.slice(2));
  const versionCodeIOS = args[ARGUMENTS.VERSION_CODE_IOS];
  const versionCodeAndroid = args[ARGUMENTS.VERSION_CODE_ANDROID];
  const versionName = args[ARGUMENTS.VERSION_NAME];
  const nameIOS = args[ARGUMENTS.VERSION_NAME] + "-" + args[ARGUMENTS.VERSION_CODE_IOS];
  const nameAndroid = args[ARGUMENTS.VERSION_NAME] + "-" + args[ARGUMENTS.VERSION_CODE_ANDROID];
  const teams_webhook_url = args[ARGUMENTS.TEAMS_WEBHOOK_URL];
  const env = args[ARGUMENTS.ENVIRONMENT];
  const jiraToken = args[ARGUMENTS.JIRA_TOKEN];
  const tickets = args[ARGUMENTS.TICKETS_NUMBER];

  let linkIOS = "";

  switch (env) {
    case "sit":
      linkIOS = "https://testflight.apple.com/join/DXmi3ond";
      break;
    case "uat":
      linkIOS = "https://testflight.apple.com/join/gQjitIHu";
      break;
    case "bau":
      linkIOS = "https://testflight.apple.com/join/56I2wCfg";
      break;
    case "dev":
      break;
    case "prod":
      linkIOS = "https://testflight.apple.com/join/IJWXOVTL";
      break;
    default:
      break;
  }

  if (tickets && env !== "dev") {
    let ticketsArray = tickets.split(",").filter(val => val !== "");

    for (let ticketNo of ticketsArray) {
      const transitionResponse = await provideAsync("GET", {
        url: `https://fletcher-digitalplatform.atlassian.net/rest/api/3/issue/${ticketNo}/transitions`,
        headers: {
          "content-type": "application/json",
          Authorization: "Basic " + jiraToken,
        },
      }).catch(console.log);

      let transitionObj;
      if (transitionResponse && transitionResponse.transitions) {
        transitionObj = transitionResponse.transitions.find(val => val.name === "Ready to Test");
        if (transitionObj) {
          const issueResponse = await provideAsync("GET", {
            url: `https://fletcher-digitalplatform.atlassian.net/rest/api/3/issue/${ticketNo}`,
            headers: {
              "content-type": "application/json",
              Authorization: "Basic " + jiraToken,
            },
          }).catch(console.log);
          if (issueResponse?.fields?.status?.name !== "In Review") {
            transitionObj = undefined;
          }
        }
      }
      if (transitionObj) {
        await provideAsync("POST", {
          url: "https://fletcher-digitalplatform.atlassian.net/rest/api/3/issue/" + ticketNo + "/transitions",
          headers: {
            "content-type": "application/json",
            Authorization: "Basic " + jiraToken,
          },
          body: JSON.stringify({
            transition: {
              id: transitionObj.id,
            },
          }),
        }).catch(console.log);
        await provideAsync("POST", {
          url: "https://fletcher-digitalplatform.atlassian.net/rest/api/2/issue/" + ticketNo + "/comment",
          headers: {
            "content-type": "application/json",
            Authorization: "Basic " + jiraToken,
          },
          body: JSON.stringify({
            body: "Release version " + env + "\n" + "android: " + nameAndroid + "\n" + "ios: " + nameIOS,
          }),
        }).catch(console.log);
      }
    }
  }

  const body = JSON.stringify({
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    themeColor: "0078D7",
    title: `Trade App Release Notes: ${moment().format("dddd, MMMM-DD-YYYY")} (Android: ${nameAndroid} - iOS: ${nameIOS})
    ${env === "dev" ? "Dev build do not use" : ""}`,
    text: "Description:\n\r" + "- " + tickets.replace(",", "\n\r- "),
    sections: [
      {
        activityTitle: `New Android Build`,
        activitySubtitle: `New build has been uploaded for testing. Version "${versionName} (${versionCodeAndroid})"`,
        facts: [
          {
            name: "Platform",
            value: "Android",
          },
          {
            name: "Version",
            value: nameAndroid,
          },
          {
            name: "Environment",
            value: env,
          },
          {
            name: "AppCenter Android Link",
            value: `https://install.appcenter.ms/orgs/placemakers/apps/placemakerstradeapp_${env}_android/distribution_groups/ents`,
          },
        ],
      },
      {
        activityTitle: "New iOS Build",
        activitySubtitle: `New build has been uploaded for testing. Version "${versionName} (${versionCodeIOS})"`,
        facts: [
          {
            name: "Platform",
            value: "iOS",
          },
          {
            name: "Version",
            value: nameIOS,
          },
          {
            name: "Environment",
            value: env,
          },
          {
            name: "Link",
            value: linkIOS,
          },
        ],
      },
      {
        activityTitle: "New iOS Adhoc Build",
        activitySubtitle: `New build has been uploaded for testing. Version "${versionName} (${versionCodeIOS})"`,
        facts: [
          {
            name: "Platform",
            value: "iOS - Adhoc",
          },
          {
            name: "Version",
            value: nameIOS,
          },
          {
            name: "Environment",
            value: env,
          },
          {
            name: "AppCenter IOS Link",
            value: `https://install.appcenter.ms/orgs/placemakers/apps/placemakerstradeapp_${env}_ios/distribution_groups/ents`,
          },
        ],
      },
    ],
  });
  request.post({ url: teams_webhook_url, body }, function (error, response, body) {
    console.log(body);
  });
})();
