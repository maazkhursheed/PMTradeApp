const fs = require("fs").promises;
const request = require("request");
const childProcess = require("child_process");

function requestPromise(config, method) {
  return new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      // in addition to parsing the value, deal with possible errors
      if (error || response.statusCode >= 300) {
        return reject(body);
      }
      try {
        // JSON.parse() can throw an exception if not valid JSON
        resolve(JSON.parse(body));
      } catch (e) {
        reject(body);
      }
    };
    switch (method) {
      case "PUT":
        request.put(config, callback);
        break;
      case "POST":
        request.post(config, callback);
        break;
      case "GET":
        request.get(config, callback);
        break;
      case "DELETE":
        request.delete(config, callback);
        break;
    }
  });
}

const ARGUMENTS = {
  VERSION_NAME: "vname",
  VERSION_CODE: "vcode",
  DRIVE_ID: "driveid",
  PARENT_ITEM_ID: "folderid",
  CLIENT_ID: "clientid",
  CLIENT_SECRET: "clientsecret",
  REFRESH_TOKEN: "token",
  FILE_PATH: "file",
  PLATFORM: "platform",
  ENVIRONMENT: "env",
};

(async function () {
  const args = require("minimist")(process.argv.slice(2));
  const platform = args[ARGUMENTS.PLATFORM];
  const env = args[ARGUMENTS.ENVIRONMENT];
  const name = platform + "-" + env + "-" + args[ARGUMENTS.VERSION_NAME] + "-" + args[ARGUMENTS.VERSION_CODE];
  const drive_id = args[ARGUMENTS.DRIVE_ID];
  const parent_item_id = args[ARGUMENTS.PARENT_ITEM_ID];
  const client_id = args[ARGUMENTS.CLIENT_ID];
  const client_secret = args[ARGUMENTS.CLIENT_SECRET];
  const refresh_token = args[ARGUMENTS.REFRESH_TOKEN];
  const filePath = args[ARGUMENTS.FILE_PATH]; // + platform === "android" ? `/android/app/build/outputs/apk/${env}/release/app-${env}-release.apk` : "";

  try {
    const loginResponse = await requestPromise(
      {
        url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        form: {
          redirect_uri: "https://localhost/signin",
          client_id,
          client_secret,
          refresh_token,
          grant_type: "refresh_token",
        },
      },
      "POST",
    );

    const buffer = await fs.readFile(filePath);
    const bufferLength = buffer.length;

    const createFolderResponse = await requestPromise(
      {
        url: `https://graph.microsoft.com/v1.0/drives/${drive_id}/items/${parent_item_id}/children`,
        headers: {
          Authorization: "Bearer " + loginResponse.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          folder: {},
          "@microsoft.graph.conflictBehavior": "replace",
        }),
      },
      "POST",
    );

    const createSessionResponse = await requestPromise(
      {
        url: `https://graph.microsoft.com/v1.0/drives/${drive_id}/items/${createFolderResponse.id}:/${
          platform === "ios" ? "app-release.ipa" : "app-release.apk"
        }:/createUploadSession`,
        headers: {
          Authorization: "Bearer " + loginResponse.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: {
            "@microsoft.graph.conflictBehavior": "replace",
          },
        }),
      },
      "POST",
    );

    let uploadResponse;

    if (createSessionResponse.uploadUrl) {
      try {
        uploadResponse = await requestPromise(
          {
            url: createSessionResponse.uploadUrl,
            headers: {
              Authorization: "Bearer " + loginResponse.access_token,
              "Content-Length": bufferLength,
              "Content-Range": "bytes 0-" + (bufferLength - 1) + "/" + bufferLength,
            },
            body: buffer,
          },
          "PUT",
        );
      } catch (e) {
        await requestPromise(
          {
            url: createSessionResponse.uploadUrl,
            headers: {
              Authorization: "Bearer " + loginResponse.access_token,
            },
          },
          "DELETE",
        );
      }

      if (uploadResponse && uploadResponse.webUrl) {
        const uploadPublicResponse = await requestPromise(
          {
            url: `https://graph.microsoft.com/v1.0/drives/${drive_id}/items/${uploadResponse.id}/createLink`,
            headers: {
              Authorization: "Bearer " + loginResponse.access_token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "view",
              scope: "organization",
            }),
          },
          "POST",
        );
        console.log(uploadPublicResponse.link.webUrl);
      }
    }
  } catch (e) {
    console.log(e);
  }
})();
