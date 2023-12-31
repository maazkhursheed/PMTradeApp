declare module "react-native-marketingcloudsdk" {
  export default class MCReactModule {
    static isPushEnabled(): Promise<boolean>;
    static enablePush(): void;
    static disablePush(): void;
    static getSystemToken(): Promise<string>;
    static getAttributes(): Promise<Map<string, string>>;
    static setAttribute(key: string, value: string): void;
    static clearAttribute(key: string): void;
    static addTag(tag: string): void;
    static removeTag(tag: string): void;
    static getTags(): Promise<Array<string>>;
    static setContactKey(contactKey: string): void;
    static getContactKey(): Promise<string>;
    static enableVerboseLogging(): void;
    static disableVerboseLogging(): void;
    static logSdkState(): void;
    static startWatchingLocation(): void;
    static stopWatchingLocation(): void;
    static isWatchingLocation(): Promise<boolean>;
    static getInboxMessages(): Promise<[any]>;
    static refreshMessages(): Promise<boolean>;
    static markAllMessagesRead(): void;
    static sendInboxOpenAnalytics(messageId: string): void;
    static getMessageCount(): Promise<any>;
    static getReadMessageCount(): Promise<any>;
    static getUnreadMessageCount(): Promise<any>;
  }
}
