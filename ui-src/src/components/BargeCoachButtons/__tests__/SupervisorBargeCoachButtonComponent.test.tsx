import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { SupervisorBargeCoachButtons } from '../SupervisorBargeCoachButtonComponent';

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

describe('SupervisorBargeCoachButtons component enable to disable', () => {
  it('renders correctly', () => {
    const mockTask = {
      conference: {
        conferenceSid: "CFxxxxxx",
        participants: [{
          participantType: 'worker',
          workerSid: 'flex-selector-test-id',
          callSid: 'CAxxxx'
        }],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined'
              },
              routingProperties: {
                workerSid: 'flex-selector-test-id'
              }
            }
          ]
        }
      }
    }
    const wrapper = render(
      <SupervisorBargeCoachButtons key="callback-component" task={mockTask} />
    )
    expect(wrapper).toMatchSnapshot();
  });
  it('call coachHandleClick successfully', async () => {
    const mockTask = {
      conference: {
        conferenceSid: "CFxxxxxx",
        participants: [{
          participantType: 'worker',
          workerSid: 'flex-selector-test-id',
          callSid: 'CAxxxx'
        }],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined'
              },
              routingProperties: {
                workerSid: 'flex-selector-test-id'
              }
            }
          ]
        }
      }
    }
    const { getByTestId } = render(
      <SupervisorBargeCoachButtons task={mockTask} />
    )
    const coachBtn = getByTestId('coachBtn');
    expect(coachBtn).toBeEnabled();
    //await userEvent.click(coachBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call coachHandleClick error due to mismatching workerSID', async () => {
    const mockErrorTask = {
      conference: {
        conferenceSid: "CFxxxxxx",
        participants: [{
          participantType: 'worker',
          workerSid: 'WKxxx',
          callSid: 'CAxxxx'
        }],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined'
              },
              routingProperties: {
                workerSid: 'WKxxx'
              }
            }
          ]
        }
      }
    }
    const { getByTestId } = render(
      <SupervisorBargeCoachButtons task={mockErrorTask} />
    )
    const coachBtn = getByTestId('coachBtn');
    expect(coachBtn).toBeEnabled();
    await userEvent.click(coachBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call coachHandleClick error due to no conferenceSID', async () => {
    const mockErrorTask = {
      conference: {
      }
    }
    const { getByTestId } = render(
      <SupervisorBargeCoachButtons task={mockErrorTask} />
    )
    const coachBtn = getByTestId('coachBtn');
    expect(coachBtn).toBeEnabled();
    await userEvent.click(coachBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call bargeHandleClick successfully', async () => {
    const mockTask = {
      conference: {
        conferenceSid: "CFxxxxxx",
        participants: [{
          participantType: 'worker',
          workerSid: 'flex-selector-test-id',
          callSid: 'CAxxxx'
        }],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined'
              },
              routingProperties: {
                workerSid: 'flex-selector-test-id'
              }
            }
          ]
        }
      }
    }
    const { getByTestId } = render(
      <SupervisorBargeCoachButtons task={mockTask} />
    )
    const bargeBtn = getByTestId('bargeBtn');
    expect(bargeBtn).toBeEnabled();
    await userEvent.click(bargeBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call bargeHandleClick error due to mismatching workerSID', async () => {
    const mockErrorTask = {
      conference: {
        conferenceSid: "CFxxxxxx",
        participants: [{
          participantType: 'worker',
          workerSid: 'WKxxx',
          callSid: 'CAxxxx'
        }],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined'
              },
              routingProperties: {
                workerSid: 'WKxxx'
              }
            }
          ]
        }
      }
    }
    const { getByTestId } = render(
      <SupervisorBargeCoachButtons task={mockErrorTask} />
    )
    const bargeBtn = getByTestId('bargeBtn');
    expect(bargeBtn).toBeEnabled();
    await userEvent.click(bargeBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call bargeHandleClick error due to no conferenceSID', async () => {
    const mockErrorTask = {
      conference: {
      }
    }
    const { getByTestId } = render(
      <SupervisorBargeCoachButtons task={mockErrorTask} />
    )
    const bargeBtn = getByTestId('bargeBtn');
    expect(bargeBtn).toBeEnabled();
    await userEvent.click(bargeBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
})

