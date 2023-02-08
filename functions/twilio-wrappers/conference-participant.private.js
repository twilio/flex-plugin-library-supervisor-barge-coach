const { isString, isObject, isNumber, isBoolean } = require("lodash");

const retryHandler = require(Runtime.getFunctions()[
  "twilio-wrappers/retry-handler"
].path).retryHandler;

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
  const {
    context,
    conferenceSid,
    participantSid,
    agentSid,
    muted,
    coaching,
    attempts,
  } = parameters;

  if (!isObject(context))
    throw "Invalid parameters object passed. Parameters must contain reason context object";
  if (!isString(conferenceSid))
    throw "Invalid parameters object passed. Parameters must contain conferenceSid string";
  if (!isString(participantSid))
    throw "Invalid parameters object passed. Parameters must contain participantSid string";
  if (!isString(agentSid))
    throw "Invalid parameters object passed. Parameters must contain agentSid string";
  if (!isString(muted))
    throw "Invalid parameters object passed. Parameters must contain muted boolean";
  if (!isString(coaching))
    throw "Invalid parameters object passed. Parameters must contain coaching boolean";
  if (!isNumber(attempts))
    throw "Invalid parameters object passed. Parameters must contain the number of attempts";
  try {
    const client = context.getTwilioClient();
    const updatedConference = await client
      .conferences(conferenceSid)
      .participants(participantSid)
      .update({
        coaching: coaching,
        callSidToCoach: agentSid,
        muted: muted,
      });
      
    return { success: true, updatedConference, status: 200 };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
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
  const {
    context,
    conferenceSid,
    participantSid,
    muted,
    attempts,
  } = parameters;

  if (!isObject(context))
    throw "Invalid parameters object passed. Parameters must contain reason context object";
  if (!isString(conferenceSid))
    throw "Invalid parameters object passed. Parameters must contain conferenceSid string";
  if (!isString(participantSid))
    throw "Invalid parameters object passed. Parameters must contain participantSid string";
  if (!isString(muted))
    throw "Invalid parameters object passed. Parameters must contain muted boolean";
  if (!isNumber(attempts))
    throw "Invalid parameters object passed. Parameters must contain the number of attempts";
  try {
    const client = context.getTwilioClient();

    const updatedConference = await client
      .conferences(conferenceSid)
      .participants(participantSid)
      .update({
        muted: muted,
      });
    return { success: true, updatedConference, status: 200 };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
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

  if (!isObject(context))
    throw "Invalid parameters object passed. Parameters must contain reason context object";
  if (!isString(conference))
    throw "Invalid parameters object passed. Parameters must contain conference string";
  if (!isString(participant))
    throw "Invalid parameters object passed. Parameters must contain participant string";
  if (!isBoolean(endConferenceOnExit))
    throw "Invalid parameters object passed. Parameters must contain endConferenceOnExit boolean";

  try {
    const client = context.getTwilioClient();

    const participantsResponse = await client
      .conferences(conference)
      .participants(participant)
      .update({
        endConferenceOnExit,
      });

    return { success: true, participantsResponse, status: 200 };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
  }
};