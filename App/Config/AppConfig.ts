import Aes from "react-native-aes-crypto";
import Config from "react-native-config";

export const GetConstants = async (decryptInput: string) => {
  const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, "aes-256-cbc");
  try {
    const spiltData = decryptInput.split(" ");
    const cipher = spiltData[0];
    const iv = spiltData[1];
    const key = "4fd8a942c1b08150582fb38187cccc6c2c2c1e5827d7d93914f6d4592409d64d";
    const text = await decryptData({ cipher, iv }, key);
    if (text !== null) {
      return text;
    } else {
      return "Error";
    }
  } catch (e) {
    return "Error";
  }
};

const AppConfig: AppConfig = {
  allowTextFontScaling: true,
  NUMBER_OF_LINES: 500,
  IS_PRODUCTION: Config.IS_PRODUCTION === "true",
  ENVIRONMENT: Config.ENVIRONMENT,
  IS_ADHOC: Config.IS_ADHOC === "true",

  // Need to revert this and us in native side encryption, Applying this to unblock SIT android crash
  MC_APPLICATION_ID: Config.MC_APPLICATION_ID,
  MC_ACCESS_TOKEN: Config.MC_ACCESS_TOKEN,
  MC_CLOUD_SERVER_URL: Config.MC_CLOUD_SERVER_URL,
  // Please check the variable below it should not be hardcoded
  APPID_FOR_UPDATE: Config.APPID_FOR_UPDATE,
  NEWRELIC_ANDROID_KEY: Config.NEWRELIC_ANDROID_KEY,
  NEWRELIC_IOS_KEY: Config.NEWRELIC_IOS_KEY,
  SENDER_ID: Config.SENDER_ID,
};

export const initializeAppConfig = async () => {
  AppConfig.CORE_LOGIC_OCC_ENDPOINT = await GetConstants(Config.CORE_LOGIC_OCC_ENDPOINT);
  AppConfig.SMTP_SERVER_URL = await GetConstants(Config.SMTP_SERVER_URL);
  AppConfig.SMTP_SERVER_USERNAME = await GetConstants(Config.SMTP_SREVER_USERNAME);
  AppConfig.SMTP_SERVER_PASSWORD = await GetConstants(Config.SMTP_SERVER_PASSWORD);
  AppConfig.SMTP_SERVER_PORT = await GetConstants(Config.SMTP_SERVER_PORT);
  AppConfig.CLIENT_ID = await GetConstants(Config.CLIENT_ID);
  AppConfig.GRANT_TYPE = await GetConstants(Config.GRANT_TYPE);
  AppConfig.CLIENT_SECRET = await GetConstants(Config.CLIENT_SECRET);
  AppConfig.HYBRIS_AUDIENCE = await GetConstants(Config.HYBRIS_AUDIENCE);
  AppConfig.AUTH0_CLIENT_ID = await GetConstants(Config.AUTH0_CLIENT_ID);
  AppConfig.AUTH0_SCOPE = await GetConstants(Config.AUTH0_SCOPE);
  AppConfig.AUTH0_AUDIENCE = await GetConstants(Config.AUTH0_AUDIENCE);
  AppConfig.CCV2_ENDPOINT = await GetConstants(Config.CCV2_ENDPOINT);
  AppConfig.ACE_ENDPOINT = await GetConstants(Config.ACE_ENDPOINT);
  AppConfig.CORE_LOGIC_ENDPOINT = await GetConstants(Config.CORE_LOGIC_ENDPOINT);
  AppConfig.PRIVACY_POLICY_LINK = await GetConstants(Config.PRIVACY_POLICY_LINK);
  AppConfig.STC_TOGGLE = await GetConstants(Config.STC_TOGGLE);
  AppConfig.PIXEL_ENDPOINT = await GetConstants(Config.PIXEL_ENDPOINT);
  AppConfig.TERMS_TRADE_LINK = await GetConstants(Config.TERMS_TRADE_LINK);
  AppConfig.ORDER_EMAIL_ADDRESS = await GetConstants(Config.ORDER_EMAIL_ADDRESS);
  AppConfig.TRADE_APP_EMAIL_ADDRESS = await GetConstants(Config.TRADEAPP_EMAIL_ADDRESS);
  AppConfig.BRANCH_EMAIL = await GetConstants(Config.BRANCH_EMAIL);
  AppConfig.SUPPORT_EMAIL = await GetConstants(Config.SUPPORT_EMAIL);
  AppConfig.AUTH0_STC_AUDIENCE = await GetConstants(Config.AUTH0_STC_AUDIENCE);
  AppConfig.SF_CLIENT_ID = await GetConstants(Config.SF_CLIENT_ID);
  AppConfig.SF_CLIENT_SECRET = await GetConstants(Config.SF_CLIENT_SECRET);
  AppConfig.SF_USER = await GetConstants(Config.SF_USER);
  AppConfig.SF_PASSWORD = await GetConstants(Config.SF_PASSWORD);
  AppConfig.SF_GRANT_TYPE = await GetConstants(Config.SF_GRANT_TYPE);
  AppConfig.MQTT_HOST = await GetConstants(Config.MQTT_HOST);
  AppConfig.MQTT_PORT = await GetConstants(Config.MQTT_PORT);
  AppConfig.MQTT_USER = await GetConstants(Config.MQTT_USER);
  AppConfig.MQTT_PASS = await GetConstants(Config.MQTT_PASS);
  AppConfig.MQTT_VERSION = await GetConstants(Config.MQTT_VERSION);
  AppConfig.MQTT_USER_PUBLISHER = await GetConstants(Config.MQTT_USER_PUBLISHER);
  AppConfig.MQTT_PASS_PUBLISHER = await GetConstants(Config.MQTT_PASS_PUBLISHER);
  AppConfig.ACE_API_VERSION = await GetConstants(Config.ACE_API_VERSION);
  // AppConfig.MC_APPLICATION_ID = await GetConstants(Config.MC_APPLICATION_ID);
  // AppConfig.MC_ACCESS_TOKEN = await GetConstants(Config.MC_ACCESS_TOKEN);
  // AppConfig.MC_CLOUD_SERVER_URL = await GetConstants(Config.MC_CLOUD_SERVER_URL);
  AppConfig.PIXEL_REFERRAL_URL = await GetConstants(Config.PIXEL_REFERRAL_URL);
  AppConfig.PIXEL_PIXEL_ACCOUNT_ID = await GetConstants(Config.PIXEL_PIXEL_ACCOUNT_ID);
  AppConfig.PLACE_MAKER_URL = await GetConstants(Config.PLACE_MAKER_URL);
  AppConfig.SUBCATEGORIES_CATALOG_ID = await GetConstants(Config.SUBCATEGORIES_CATALOG_ID);
  AppConfig.SUBCATEGORIES_CATALOG_VERSION_ID = await GetConstants(Config.SUBCATEGORIES_CATALOG_VERSION_ID);
  AppConfig.ESTIMATES_JOBS_URL = await GetConstants(Config.ESTIMATES_JOBS_URL);
  AppConfig.UX_CAM_APP_KEY = await GetConstants(Config.UXCAM_APP_KEY);
  // AppConfig.APPID_FOR_UPDATE = await GetConstants(Config.APPID_FOR_UPDATE);
  // AppConfig.AUTH0_ENDPOINT = await GetConstants(Config.AUTH0_ENDPOINT);
  AppConfig.AUTH0_ENDPOINT = await GetConstants(Config.AUTH0_ENDPOINT);
  AppConfig.PENDO_APP_KEY = await GetConstants(Config.PENDO_APP_KEY);
};
export default AppConfig;

export interface AppConfig {
  ENVIRONMENT: string;
  allowTextFontScaling: boolean;
  SMTP_SERVER_URL?: string;
  SMTP_SERVER_USERNAME?: string;
  SMTP_SERVER_PASSWORD?: string;
  SMTP_SERVER_PORT?: string;
  CLIENT_ID?: string;
  GRANT_TYPE?: string;
  CLIENT_SECRET?: string;
  HYBRIS_AUDIENCE?: string;
  AUTH0_CLIENT_ID?: string;
  AUTH0_SCOPE?: string;
  AUTH0_AUDIENCE?: string;
  AUTH0_ENDPOINT?: string;
  CCV2_ENDPOINT?: string;
  ACE_ENDPOINT?: string;
  CORE_LOGIC_ENDPOINT?: string;
  PRIVACY_POLICY_LINK?: string;
  STC_TOGGLE?: string;
  PIXEL_ENDPOINT?: string;
  TERMS_TRADE_LINK?: string;
  ORDER_EMAIL_ADDRESS?: string;
  TRADE_APP_EMAIL_ADDRESS?: string;
  BRANCH_EMAIL?: string;
  SUPPORT_EMAIL?: string;
  APPID_FOR_UPDATE?: string;
  AUTH0_STC_AUDIENCE?: string;
  SF_CLIENT_ID?: string;
  SF_CLIENT_SECRET?: string;
  SF_USER?: string;
  SF_PASSWORD?: string;
  SF_GRANT_TYPE?: string;
  SENDER_ID?: string;
  MQTT_HOST?: string;
  MQTT_PORT?: string;
  MQTT_USER?: string;
  MQTT_PASS?: string;
  MQTT_VERSION?: string;
  MQTT_USER_PUBLISHER?: string;
  MQTT_PASS_PUBLISHER?: string;
  ACE_API_VERSION?: string;
  MC_APPLICATION_ID?: string;
  MC_ACCESS_TOKEN?: string;
  MC_CLOUD_SERVER_URL?: string;
  PIXEL_REFERRAL_URL?: string;
  PIXEL_PIXEL_ACCOUNT_ID?: string;
  PLACE_MAKER_URL?: string;
  SUBCATEGORIES_CATALOG_ID?: string;
  SUBCATEGORIES_CATALOG_VERSION_ID?: string;
  ESTIMATES_JOBS_URL?: string;
  UX_CAM_APP_KEY?: string;
  IS_PRODUCTION: boolean;
  IS_ADHOC: boolean;
  NUMBER_OF_LINES: number;
  PENDO_APP_KEY?: string;
  CORE_LOGIC_OCC_ENDPOINT?: string;
  NEWRELIC_ANDROID_KEY?: string;
  NEWRELIC_IOS_KEY?: string;
}
