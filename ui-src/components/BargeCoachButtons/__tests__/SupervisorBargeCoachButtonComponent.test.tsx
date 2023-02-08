// import * as React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { TaskHelper, useFlexSelector, ITask, Manager, IconButton } from '@twilio/flex-ui';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppState, reduxNamespace } from '../../../states'
// import { Actions } from "../../../flex-hooks/states/SupervisorBargeCoach"
// import { Flex, Stack } from "@twilio-paste/core";
// import { isAgentCoachingPanelEnabled } from '../../..';
// import { SyncDoc } from '../../../utils/sync/Sync'
// import { ParticipantTypes } from '@twilio/flex-ui/src/state/Participants/participants.types';


import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import BargeCoachService from '../../../utils/serverless/BargeCoachService';
import { SupervisorBargeCoachButtons } from '../SupervisorBargeCoachButtonComponent';
import { DateTime } from 'luxon';

jest.mock('../../../utils/serverless/BargeCoachService');
jest.mock('react-redux', () => ({
  useSelector: () => ({
    muted: true,
    barge: true,
    enableBargeinButton: true,
    coaching: true,
    enableCoachButton: true,
    privateMode: false
  }),
  useDispatch: () => jest.fn()
}));
jest.mock('../../..', () => ({
  isAgentCoachingPanelEnabled: jest.fn().mockReturnValue(true)
}))

const mockTask = {
  conference: {
    conferenceSid: "CFxxxxxx",
    source:{

    }
  }
}

describe('SupervisorBargeCoachButtons component', () => {

  it('renders correctly', () => {
    const wrapper = render(
      <SupervisorBargeCoachButtons key="callback-component" task={mockTask} />
    )
    expect(wrapper).toMatchSnapshot();
  });
//   it('call button creates outbound call', async () => {
//     const { getByTestId } = render(
//         <SupervisorBargeCoachButtons task={mockTask} />
//     )
//     const callBtn = getByTestId('callbackBtn');
//     expect(callBtn).toBeEnabled();
//     await userEvent.click(callBtn);
//     expect(CallbackService.callCustomerBack).toHaveBeenCalled();
// });
})
