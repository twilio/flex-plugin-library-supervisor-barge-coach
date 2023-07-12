import Analytics, { Method } from '../Analytics';

jest.mock('@twilio/flex-ui', () => ({
  __esModule: true,
  VERSION: '2.1.1',
}));

describe('Analytics', () => {
  const mockCommonProperties = {
    accountSid: '',
    flexUiVersion: '2.1.1',
    originalPluginName: 'plibo-supervisor-barge-and-coach',
    plugin: 'plibo-supervisor-barge-and-coach',
    pluginVersion: '1.0.0',
    product: 'Flex',
    workerSid: '',
  };
  const mockedPageProperties = {
    path: '/',
    referrer: '',
    search: '',
    title: 'Twilio Flex',
    url: 'http://flex-test.twilio.com',
  };
  const mockEvent = 'Test Event';
  const mockEventProperties = {
    foo: 'bar',
  };
  const postMessageFn = jest.fn();
  const callbackFn = jest.fn();

  jest.spyOn(document, 'querySelector').mockReturnValue({
    ...document.createElement('iframe'),
    contentWindow: {
      postMessage: postMessageFn,
    },
  } as Element);
  const pagePropsSpy = jest.spyOn(Analytics as any, '_pageProperties', 'get').mockReturnValue(mockedPageProperties);
  const segmentSpy = jest.spyOn(Analytics as any, 'segment', 'get');
  const postSpy = jest.spyOn(Analytics as any, '_post');

  it('should post event if analytics iframe exists', () => {
    Analytics.track(mockEvent, mockEventProperties);
    expect(pagePropsSpy).toBeCalled();
    expect(segmentSpy).toBeCalled();
    expect(postSpy).toBeCalled();
    expect(postMessageFn).toBeCalled();
  });

  it('should not post event if analytics iframe does not exist', () => {
    segmentSpy.mockReturnValueOnce(null);
    Analytics.track(mockEvent, mockEventProperties);
    expect(postSpy).toBeCalled();
    expect(postMessageFn).toBeCalledTimes(0);
  });

  it('should post track event when Analytics.track is called', () => {
    Analytics.track(mockEvent, mockEventProperties, callbackFn);
    expect(postSpy).toBeCalledWith(
      Method.TRACK,
      mockEvent,
      {
        ...mockCommonProperties,
        ...mockEventProperties,
      },
      {
        context: {
          groupId: mockCommonProperties.accountSid,
          page: { ...mockedPageProperties },
        },
      },
      callbackFn,
    );
  });

  it('should post page event when Analytics.track is called', () => {
    Analytics.page(mockEvent, mockEventProperties, callbackFn);
    expect(postSpy).toBeCalledWith(
      Method.PAGE,
      mockEvent,
      {
        ...mockCommonProperties,
        ...mockEventProperties,
        ...mockedPageProperties,
      },
      {
        context: {
          groupId: mockCommonProperties.accountSid,
        },
      },
      callbackFn,
    );
  });

  it('should post identify event when Analytics.track is called', () => {
    Analytics.identify(mockEventProperties);
    expect(postSpy).toBeCalledWith(
      Method.IDENTIFY,
      mockCommonProperties.workerSid,
      {
        ...mockCommonProperties,
        ...mockEventProperties,
      },
      {
        context: {
          groupId: mockCommonProperties.accountSid,
          page: { ...mockedPageProperties },
        },
      },
      undefined,
    );
  });

  it('should post group event when Analytics.track is called', () => {
    Analytics.group('123', mockEventProperties, callbackFn);
    expect(postSpy).toBeCalledWith(
      Method.GROUP,
      '123',
      {
        ...mockCommonProperties,
        ...mockEventProperties,
      },
      {
        context: {
          page: { ...mockedPageProperties },
        },
      },
      callbackFn,
    );
  });
});
