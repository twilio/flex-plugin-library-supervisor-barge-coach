import helpers from '../test-utils/test-helper';

jest.mock(
    '../../functions/helpers/prepare-function.private.js',
    () => ({
        __esModule: true,
        prepareFlexFunction: (_, fn) => fn,
    }),
);

describe('Conference Participant', () => {
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

    it('coachToggle should throw error due to invalid context ', async () => {
        const {coachToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const payload = {
            context:'',
            conferenceSid:'CFxxxxx',
            participantSid:'PAxxxx',
            agentSid:'AGxxx',
            muted:'true',
            coaching:'test',
            attempts:0
        }
        await coachToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain reason context object')
          });
    });
    it('coachToggle should throw error due to invalid conferenceSid ', async () => {
        const {coachToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:1232,
            participantSid:'PAxxxx',
            agentSid:'AGxxx',
            muted:'true',
            coaching:'test',
            attempts:0
        }
        await coachToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain conferenceSid string')
          });
    });
    it('coachToggle should throw error due to invalid participantSid ', async () => {
        const {coachToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:123,
            agentSid:'AGxxx',
            muted:'true',
            coaching:'test',
            attempts:0
        }
        await coachToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain participantSid string')
          });
    });
    it('coachToggle should throw error due to invalid agentSid ', async () => {
        const {coachToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:'PAxxxx',
            agentSid:1234234,
            muted:'true',
            coaching:'test',
            attempts:0
        }
        await coachToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain agentSid string')
          });
    });
    it('coachToggle should throw error due to invalid muted ', async () => {
        const {coachToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:'PAxxxx',
            agentSid:'AGxxxxx',
            muted:123,
            coaching:'test',
            attempts:0
        }
        await coachToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain muted boolean')
          });
    });
    it('coachToggle should throw error due to invalid coaching ', async () => {
        const {coachToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:'PAxxxx',
            agentSid:'AGxxxxx',
            muted:'true',
            coaching:123,
            attempts:0
        }
        await coachToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain coaching boolean')
          });
    });
    it('coachToggle should throw error due to invalid attempts ', async () => {
        const {coachToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:'PAxxxx',
            agentSid:'AGxxxxx',
            muted:'true',
            coaching:'test',
            attempts:'0'
        }
        await coachToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain the number of attempts')
          });
    });
    it('updateParticipant should be called successfully ', async () => {
        const {updateParticipant} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            endConferenceOnExit:true,
            conference:'test',
            participant:'test participant'
        }
        await updateParticipant({...payload})
    });
    it('bargeToggle should throw error due to invalid attempts ', async () => {
        const {bargeToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:'PAxxxx',
            muted:'true',
            attempts:'0'
        }
        await bargeToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain the number of attempts')
          });
    });
    it('bargeToggle should throw error due to invalid muted ', async () => {
        const {bargeToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:'PAxxxx',
            muted:123,
            attempts:0
        }
        await bargeToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain muted boolean')
          });
    });
    it('bargeToggle should throw error due to invalid participantSid ', async () => {
        const {bargeToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:'CFxxxx',
            participantSid:123,
            muted:'true',
            attempts:0
        }
        await bargeToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain participantSid string')
          });
    });
    it('bargeToggle should throw error due to invalid conferenceSid ', async () => {
        const {bargeToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conferenceSid:123,
            participantSid:'PAxxxx',
            muted:'true',
            attempts:0
        }
        await bargeToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain conferenceSid string')
          });
    });
    it('bargeToggle should throw error due to invalid context ', async () => {
        const {bargeToggle} = require('../../functions/twilio-wrappers/conference-participant.private');
        const payload = {
            context:'',
            conferenceSid:'CFxxxx',
            participantSid:'PAxxxx',
            muted:'true',
            attempts:0
        }
        await bargeToggle({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain reason context object')
          });
    });
    it('updateParticipant should throw error due to invalid endConferenceOnExit ', async () => {
        const {updateParticipant} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conference:'test conference',
            participant:'test participant',
            endConferenceOnExit:'test'
        }
        await updateParticipant({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain endConferenceOnExit boolean')
          });
    });
    it('updateParticipant should throw error due to invalid participant ', async () => {
        const {updateParticipant} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conference:'test conference',
            participant:123,
            endConferenceOnExit:true
        }
        await updateParticipant({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain participant string')
          });
    });
    it('updateParticipant should throw error due to invalid conference ', async () => {
        const {updateParticipant} = require('../../functions/twilio-wrappers/conference-participant.private');
        const mockContext = {
            PATH: 'mockPath',
            getTwilioClient: () => getParticipantMuteAndCoachTwilioClient(muteAndCoach),
        };
        const payload = {
            context:mockContext,
            conference:123,
            participant:'Test Participant',
            endConferenceOnExit:true
        }
        await updateParticipant({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain conference string')
          });
    });
    it('updateParticipant should throw error due to invalid context ', async () => {
        const {updateParticipant} = require('../../functions/twilio-wrappers/conference-participant.private');
        const payload = {
            context:'',
            conference:'Test Conference',
            participant:'Test Participant',
            endConferenceOnExit:true
        }
        await updateParticipant({...payload}).catch(err => {
            expect(err).toMatch('Invalid parameters object passed. Parameters must contain reason context object')
          });
    });
})