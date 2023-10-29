jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  ConferenceUtils: jest.fn(),
}));

import { ConferenceUtils } from '@twilio/flex-plugins-library-utils';
const taskSid = 'TSxxxxxxxx';
const mockCallSid = 'CSxxxxxxxx';
const participantSid = 'PSxxxxxxxx';

describe('coachToggle test from ConferenceParticipant', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('coachToggle returns success response', async () => {
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
    const { coachToggle } = require('../../functions/twilio-wrappers/conference-participant.private');
    const parameters = {
      conferenceSid: 'CFxxxxx',
      participantSid: 'PAxxxx',
      agentSid: 'AGxxx',
      muted: 'true',
      coaching: 'test',
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };

    const participant = await coachToggle({ context, ...parameters });

    expect(participant).toEqual({
      success: true,
      updatedConference: {},
      status: 200,
    });
  });
  it('coachToggle returns error response', async () => {
    ConferenceUtils.mockImplementation((value) => {
      return {
        coachToggle: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { coachToggle } = require('../../functions/twilio-wrappers/conference-participant.private');
    const parameters = {
      conferenceSid: 'CFxxxxx',
      participantSid: 'PAxxxx',
      agentSid: 'AGxxx',
      muted: 'true',
      coaching: 'test',
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };

    const errParticipant = await coachToggle({ context, ...parameters });

    expect(errParticipant).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('bargeToggle test from ConferenceParticipant', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('bargeToggle returns success response', async () => {
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
    const { bargeToggle } = require('../../functions/twilio-wrappers/conference-participant.private');
    const parameters = {
      conferenceSid: 'CFxxxxx',
      participantSid: 'PAxxxx',
      muted: 'true',
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };

    const participant = await bargeToggle({ context, ...parameters });

    expect(participant).toEqual({
      success: true,
      updatedConference: {},
      status: 200,
    });
  });
  it('bargeToggle returns error response', async () => {
    ConferenceUtils.mockImplementation((value) => {
      return {
        bargeToggle: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { bargeToggle } = require('../../functions/twilio-wrappers/conference-participant.private');
    const parameters = {
      conferenceSid: 'CFxxxxx',
      participantSid: 'PAxxxx',
      muted: 'true',
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };

    const errParticipant = await bargeToggle({ context, ...parameters });

    expect(errParticipant).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('updateParticipant test from ConferenceParticipant', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updateParticipant returns success response', async () => {
    ConferenceUtils.mockImplementation((value) => {
      return {
        updateParticipant: jest.fn(() =>
          Promise.resolve({
            status: 200,
            participantsResponse: {
              callSid: mockCallSid,
            },
            success: true,
          }),
        ),
      };
    });
    const { updateParticipant } = require('../../functions/twilio-wrappers/conference-participant.private');
    const parameters = {
      conference: taskSid,
      participant: participantSid,
      endConferenceOnExit: true,
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };

    const participant = await updateParticipant({ context, ...parameters });

    expect(participant).toEqual({
      success: true,
      callSid: mockCallSid,
      status: 200,
    });
  });

  it('updateParticipant return error response', async () => {
    ConferenceUtils.mockImplementation((value) => {
      return {
        updateParticipant: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { updateParticipant } = require('../../functions/twilio-wrappers/conference-participant.private');
    const parameters = {
      conference: taskSid,
      participant: participantSid,
      endConferenceOnExit: true,
    };

    const context = {
      getTwilioClient: () => () => jest.fn(),
    };
    const errParticipant = await updateParticipant({ context, ...parameters });

    expect(errParticipant).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});
