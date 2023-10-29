import { ConferenceUtils } from '@twilio/flex-plugins-library-utils';

/**
 * @param {object} parameters the parameters for the function
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conferenceSid the conference we will be updating
 * @param {string} parameters.participantSid the participant that will be barging/coaching
 * @param {string} parameters.agentSid the worker we will be coaching
 * @param {string} parameters.muted the muted status
 * @param {string} parameters.coaching the coaching status
 * @param {number} parameters.attempts the number of retry attempts performed
 * @returns {any}
 * @description the following method is used to modify a participant
 *      within the defined conference
 */
exports.coachToggle = async function coachToggle(parameters) {
  const { context, conferenceSid, participantSid, agentSid, muted, coaching, attempts } = parameters;

  const config = {
    attempts: attempts || 3,
    conferenceSid,
    participantSid,
    agentSid,
    muted,
    coaching,
  };

  const client = context.getTwilioClient();
  const conferenceClient = new ConferenceUtils(client, config);

  try {
    const conference = await conferenceClient.coachToggle(config);
    return { success: true, updatedConference: conference.updatedConference, status: 200 };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conferenceSid the conference we will be updating
 * @param {string} parameters.participantSid the participant that will be barging/coaching
 * @param {boolean} parameters.muted the muted status
 * @param {number} parameters.attempts the number of retry attempts performed
 * @returns {any}
 * @description the following method is used to modify a participant
 *      within the defined conference
 */
exports.bargeToggle = async function bargeToggle(parameters) {
  const { context, conferenceSid, participantSid, muted, attempts } = parameters;
  const config = {
    attempts: attempts || 3,
    conferenceSid,
    participantSid,
    muted,
  };

  const client = context.getTwilioClient();
  const conferenceClient = new ConferenceUtils(client, config);

  try {
    const conference = await conferenceClient.bargeToggle(config);
    return { success: true, updatedConference: conference.updatedConference, status: 200 };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conference the unique conference SID with the participant
 * @param {string} parameters.participant the unique participant SID to modify
 * @param {boolean} parameters.endConferenceOnExit whether to end conference when the participant leaves
 * @returns {Participant} The newly updated conference participant
 * @description sets endConferenceOnExit on the given conference participant
 */
exports.updateParticipant = async (parameters) => {
  const { context, conference, participant, endConferenceOnExit } = parameters;

  const config = {
    attempts: 3,
    conference,
    participant,
    endConferenceOnExit,
  };

  const client = context.getTwilioClient();
  const conferenceClient = new ConferenceUtils(client, config);
  try {
    const participants = await conferenceClient.updateParticipant(config);
    return { success: true, callSid: participants.participantsResponse.callSid, status: 200 };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};
