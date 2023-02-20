import { SupervisorBargeCoachState } from './types';

// Set the initial state of the below that we will use to change the buttons and UI
const initialState: SupervisorBargeCoachState = {
    coaching: true,
    enableCoachButton: true,
    muted: true,
    barge: true,
    enableBargeinButton: true,
    supervisorArray: [],
    privateMode: false,
    syncSubscribed: false
};

export default initialState;
  