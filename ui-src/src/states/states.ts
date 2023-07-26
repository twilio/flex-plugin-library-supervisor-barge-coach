import { SupervisorBargeCoachState, SupervisorBargeCoachReducer } from '../flex-hooks/states/SupervisorBargeCoach';

export interface CustomState {
  supervisorBargeCoach: SupervisorBargeCoachState;
}

export const customReducers = {
  supervisorBargeCoach: SupervisorBargeCoachReducer,
};
