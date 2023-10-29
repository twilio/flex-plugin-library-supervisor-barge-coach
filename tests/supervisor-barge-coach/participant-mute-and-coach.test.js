import helpers from '../test-utils/test-helper';

jest.mock('../../functions/helpers/prepare-function.private.js', () => ({
  __esModule: true,
  prepareFlexFunction: (_, fn) => fn,
}));
jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  ConferenceUtils: jest.fn(),
}));

import { ConferenceUtils } from '@twilio/flex-plugins-library-utils';

describe('Participant mute and coach', () => {
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
    global.Runtime._addFunction(
      'twilio-wrappers/conference-participant',
      './functions/twilio-wrappers/conference-participant.private.js',
    );
  });

  it('participant mute and coach - coachToggle is called successfully ', async () => {
    ConferenceUtils.mockImplementation((value) => {
      return {
        coachToggle: jest.fn(() =>
          Promise.resolve({
            status: 200,
            updatedConference: {},
            success: true,
          }),
        ),
      };
    });
    const MuteAndCoach = require('../../functions/supervisor-barge-coach/flex/participant-mute-and-coach');
    const handlerFn = MuteAndCoach.handler;

    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const mockEvent = {
      conferenceSid: 'CFxxxxx',
      participantSid: 'PAxxxx',
      agentSid: 'AGxxxx',
      muted: 'true',
      coaching: 'test',
    };

    const mockResponse = new Twilio.Response();
    const mockErrorObject = jest.fn(() => Promise.resolve());

    const mockCallbackObject = (_err, response) => {
      expect(response).toBeInstanceOf(Twilio.Response);
      expect(response._statusCode).toEqual(200);
      expect(response._body.callSid).toBe(mockCallSid);
    };
    await handlerFn(mockContext, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
  });
  it('participant mute and coach - bargeToggle is called successfully ', async () => {
    ConferenceUtils.mockImplementation((value) => {
      return {
        bargeToggle: jest.fn(() =>
          Promise.resolve({
            status: 200,
            updatedConference: {},
            success: true,
          }),
        ),
      };
    });
    const MuteAndCoach = require('../../functions/supervisor-barge-coach/flex/participant-mute-and-coach');
    const handlerFn = MuteAndCoach.handler;

    const mockContext = {
      PATH: 'mockPath',
      getTwilioClient: () => () => jest.fn(),
    };
    const mockEvent = {
      conferenceSid: 'CFxxxxx',
      participantSid: 'PAxxxx',
      agentSid: '',
      muted: 'true',
      coaching: 'test',
    };

    const mockResponse = new Twilio.Response();
    const mockErrorObject = jest.fn(() => Promise.resolve());

    const mockCallbackObject = (_err, response) => {
      expect(response).toBeInstanceOf(Twilio.Response);
      expect(response._statusCode).toEqual(200);
      expect(response._body.callSid).toBe(mockCallSid);
    };
    await handlerFn(mockContext, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
  });
});
