import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TaskHelper, useFlexSelector, ITask, Manager, IconButton } from '@twilio/flex-ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, reduxNamespace } from '../../../states'
import { Actions } from "../../../flex-hooks/states/SupervisorBargeCoach"
import BargeCoachService from '../../../utils/serverless/BargeCoachService';
import { Flex, Stack } from "@twilio-paste/core";
import { isAgentCoachingPanelEnabled } from '../../..';
import { SyncDoc } from '../../../utils/sync/Sync'
import { ParticipantTypes } from '@twilio/flex-ui/src/state/Participants/participants.types';
import { SupervisorBargeCoachButtons } from '../SupervisorBargeCoachButtonComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));


// jest.mock('@twilio/flex-ui', () => ({
//   TaskHelper: {
//     completeTask: jest.fn(),
//   },
//   useFlexSelector: jest.fn(),
//   IconButton: jest.fn(({ children, onClick }) => <button onClick={onClick}>{children}</button>),
// }));

// jest.mock('../../states', () => ({
//   reduxNamespace: 'reduxNamespace',
//   AppState: {
//     [reduxNamespace]: {
//       supervisorBargeCoach: {
//         muted: false,
//         barge: false,
//         enableBargeinButton: true,
//         coaching: false,
//         enableCoachButton: true,
//         privateMode: false
//       }
//     }
//   }
// }));

jest.mock('../../../flex-hooks/states/SupervisorBargeCoach', () => ({
  Actions: {
    setBargeCoachStatus: jest.fn()
  }
}));

jest.mock('../../../utils/serverless/BargeCoachService', () => ({
  BargeCoachService: {
    updateParticipantBargeCoach: jest.fn()
  }
}));

jest.mock('../../..', () => ({
  isAgentCoachingPanelEnabled: jest.fn().mockReturnValue(true)
}));

jest.mock('../../../utils/sync/Sync', () => ({
  SyncDoc: {
    initSyncDoc: jest.fn()
  }
}));

describe('SupervisorBargeCoachButtons component', () => {
  let task: ITask;
  let dispatch: jest.Mock;
  let useSelector: jest.Mock;
  let useFlexSelector: jest.Mock;
  let Actions: { setBargeCoachStatus: jest.Mock };
  let BargeCoachService: { updateParticipantBargeCoach: jest.Mock };
  it('renders correctly', () => {
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={{} as ITask} />);
    expect(getByTestId('supervisor-barge-coach-buttons')).toBeInTheDocument();
  });
  it('calls bargeHandleClick when barge button is clicked', () => {
    const dispatch = jest.fn();
    //const useDispatchSpy = jest.spyOn(React, 'useDispatch').mockReturnValue(dispatch);
  
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={{} as ITask} />);
    fireEvent.click(getByTestId('barge-button'));
  
    expect(dispatch).toHaveBeenCalled();
    //useDispatchSpy.mockRestore();
  });
})
