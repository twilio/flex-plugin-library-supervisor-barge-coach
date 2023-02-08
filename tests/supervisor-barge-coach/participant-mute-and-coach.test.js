import helpers from '../test-utils/test-helper';

jest.mock(
    '../../functions/helpers/prepare-function.private.js',
    () => ({
        __esModule: true,
        prepareFlexFunction: (_, fn) => fn,
    }),
);

describe('Participant mute and coach', () => {
    const getParticipantMuteAndCoachTwilioClient = function (muteAndCoach) {
        const mockService = {
            participants: ()=>(
                {
                    update: muteAndCoach
                }
            )
        };
        return {
            conferences: (_conferenceSid) => mockService,
        };
    };

    const muteAndCoach = jest.fn(() =>
        Promise.resolve({
            conferenceSid: 'CFxxxxx'
        }
        )
    );

    beforeAll(() => {
        helpers.setup();
        global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
        global.Runtime._addFunction('helpers/parameter-validator', './functions/helpers/parameter-validator.private.js');
        global.Runtime._addFunction(
            'twilio-wrappers/retry-handler',
            './functions/twilio-wrappers/retry-handler.private.js',
        );
        global.Runtime._addFunction(
            'twilio-wrappers/conference-participant',
            './functions/twilio-wrappers/conference-participant.private.js',
        );
    });

    it('participant mute and coach - coachToggle is called successfully ', async () => {
        const MuteAndCoach = require('../../functions/supervisor-barge-coach/flex/participant-mute-and-coach');
        const handlerFn = MuteAndCoach.handler;

        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
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
        const MuteAndCoach = require('../../functions/supervisor-barge-coach/flex/participant-mute-and-coach');
        const handlerFn = MuteAndCoach.handler;

        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
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

    // it('getQueues error handler is called', async () => {
    //     const GetQueues = require('../../functions/flex/taskrouter/get-queues');
    //     const handlerFn = GetQueues.handler;
    //     const mockEvent = {
    //         channelSid: 'CHxxxxx',
    //         attributes: {}
    //     };

    //     const mockResponse = new Twilio.Response();
    //     const mockCallbackObject = jest.fn();
    //     console.log(handlerFn)
    //     const mockErrorObject = jest.fn();
    //     await handlerFn({}, {}, mockCallbackObject, mockResponse, mockErrorObject);
    //     expect(mockErrorObject.mock.calls.length).toBe(1);
    // });
    // it('getQueues error handler is called because of invalid context', async () => {
    //     const GetQueues = require('../../functions/flex/taskrouter/get-queues');
    //     const handlerFn = GetQueues.handler;
    //     const mockContext = 'test context';
    //     const mockEvent = {
    //         channelSid: 'CHxxxxx',
    //         attributes: {}
    //     };

    //     const mockResponse = new Twilio.Response();
    //     const mockCallbackObject = jest.fn();
    //     console.log(handlerFn)
    //     const mockErrorObject = jest.fn();
    //     await handlerFn(mockContext, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
    //     expect(mockErrorObject.mock.calls.length).toBe(1);
    // });
});
