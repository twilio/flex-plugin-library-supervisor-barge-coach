/* eslint-disable @typescript-eslint/ban-types */
import { Action } from '../../../states';
import { ACTION_SET_BARGE_COACH_STATUS } from './types';

class Actions {
  public static setBargeCoachStatus = (status: Object): Action => {
    return {
      type: ACTION_SET_BARGE_COACH_STATUS,
      ...status,
    };
  };
}

export default Actions;
