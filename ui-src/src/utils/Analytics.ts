import { VERSION } from "@twilio/flex-ui";
import packageJSON from "../../package.json";

const flexManager = window?.Twilio?.Flex?.Manager?.getInstance();

export enum Event {
  CALL_START_MONITOR = "Call Start Monitor",
  CALL_START_BARGE = "Call Start Barge",
  CALL_START_COACH = "Call Start Coach",
}

type CommonPropertiesType = {
  product: string;
  flexUiVersion: string;
  workerSid: string;
  accountSid: string;
  plugin: string;
  pluginVersion: string;
  originalPluginName: string;
};

type PagePropertiesType = {
  path: string;
  referrer: string;
  search: string;
  title: string;
  url: string;
};

type Parameters = [
  string,
  Record<string, any>,
  Record<string, any>,
  (() => void) | undefined
];

enum Method {
  PAGE = "page",
  TRACK = "track",
  IDENTIFY = "identify",
  GROUP = "group",
}

class Analytics {
  private static readonly commonProperties: CommonPropertiesType = {
    product: "Flex",
    flexUiVersion: VERSION,
    workerSid: flexManager?.workerClient?.sid || "",
    accountSid: flexManager?.serviceConfiguration.account_sid || "",
    plugin: packageJSON.name,
    pluginVersion: packageJSON.version,
    originalPluginName: packageJSON.id,
  };

  private static get segment(): HTMLIFrameElement {
    return document.querySelector("#segment-analytics") as HTMLIFrameElement;
  }

  private static get _pageProperties(): PagePropertiesType {
    return {
      path: window.location.pathname,
      referrer: document.referrer,
      search: window.location.search,
      title: document.title,
      url: window.location.href,
    };
  }

  public static page(
    name: string,
    properties?: Record<string, any>,
    callback?: () => void
  ): void {
    this._post(
      Method.PAGE,
      name,
      {
        ...properties,
        ...this.commonProperties,
        ...this._pageProperties,
      },
      {
        context: {
          groupId: this.commonProperties.accountSid,
        },
      },
      callback
    );
  }

  public static track(
    event: string,
    properties: Record<string, any>,
    callback?: () => void
  ): void {
    this._post(
      Method.TRACK,
      event,
      {
        ...properties,
        ...this.commonProperties,
      },
      {
        context: {
          groupId: this.commonProperties.accountSid,
          page: {
            ...this._pageProperties,
          },
        },
      },
      callback
    );
  }

  public static identify(
    traits: Record<string, any> = {},
    callback?: () => void
  ): void {
    this._post(
      Method.IDENTIFY,
      this.commonProperties.workerSid,
      {
        ...traits,
        ...this.commonProperties,
      },
      {
        context: {
          groupId: this.commonProperties.accountSid,
          page: {
            ...this._pageProperties,
          },
        },
      },
      callback
    );
  }

  public static group(
    groupId: string,
    traits: Record<string, any> = {},
    callback?: () => void
  ): void {
    this._post(
      Method.GROUP,
      groupId,
      {
        ...traits,
        ...this.commonProperties,
      },
      {
        context: {
          page: {
            ...this._pageProperties,
          },
        },
      },
      callback
    );
  }

  private static _post(method: Method, ...params: Parameters): void {
    if (this.segment && this.segment.contentWindow) {
      this.segment.contentWindow.postMessage(
        {
          type: "analytics",
          method,
          params,
        },
        "*"
      );
    }
  }
}

export default Analytics;
