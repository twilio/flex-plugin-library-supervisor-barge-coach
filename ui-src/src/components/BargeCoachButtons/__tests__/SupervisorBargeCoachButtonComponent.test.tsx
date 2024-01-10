import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SupervisorBargeCoachButtons } from '../SupervisorBargeCoachButtonComponent';
import BargeCoachService from '../../../utils/serverless/BargeCoachService';

jest.mock('../../../utils/serverless/BargeCoachService');
jest.mock('react-redux', () => ({
  useSelector: () => ({
    muted: true,
    barge: true,
    enableBargeinButton: true,
    coaching: true,
    enableCoachButton: true,
    privateMode: false,
  }),
  useDispatch: () => jest.fn(),
}));
jest.mock('../../..', () => ({
  isAgentCoachingPanelEnabled: jest.fn().mockReturnValue(true),
}));
describe('SupervisorBargeCoachButtons component enable to disable', () => {
  it('renders correctly', () => {
    const mockTask = {
      conference: {
        conferenceSid: 'CFxxxxxx',
        participants: [
          {
            participantType: 'worker',
            workerSid: 'flex-selector-test-id',
            callSid: 'CAxxxx',
          },
        ],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined',
              },
              routingProperties: {
                workerSid: 'flex-selector-test-id',
              },
            },
          ],
        },
      },
    };
    const wrapper = render(<SupervisorBargeCoachButtons key="callback-component" task={mockTask} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('call coachHandleClick successfully', async () => {
    const mockTask = {
      conference: {
        conferenceSid: 'CFxxxxxx',
        participants: [
          {
            participantType: 'worker',
            workerSid: 'flex-selector-test-id',
            callSid: 'CAxxxx',
          },
        ],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined',
              },
              routingProperties: {
                workerSid: 'flex-selector-test-id',
              },
            },
          ],
        },
      },
    };
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={mockTask} />);
    const coachBtn = getByTestId('coachBtn');
    expect(coachBtn).toBeEnabled();
    await userEvent.click(coachBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call coachHandleClick error due to mismatching workerSID', async () => {
    const mockErrorTask = {
      conference: {
        conferenceSid: 'CFxxxxxx',
        participants: [
          {
            participantType: 'worker',
            workerSid: 'WKxxx',
            callSid: 'CAxxxx',
          },
        ],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined',
              },
              routingProperties: {
                workerSid: 'WKxxx',
              },
            },
          ],
        },
      },
    };
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={mockErrorTask} />);
    const coachBtn = getByTestId('coachBtn');
    expect(coachBtn).toBeEnabled();
    await userEvent.click(coachBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call coachHandleClick error due to no conferenceSID', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mockErrorTask = {
      conference: {},
    };
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={mockErrorTask} />);
    const coachBtn = getByTestId('coachBtn');
    expect(coachBtn).toBeEnabled();
    await userEvent.click(coachBtn);
    expect(consoleSpy).toHaveBeenCalledWith('conferenceSid = null, returning');
  });
  it('call bargeHandleClick successfully', async () => {
    const updateParticipantBargeCoachSpy = jest.spyOn(BargeCoachService, 'updateParticipantBargeCoach');
    const mockTask = {
      conference: {
        conferenceSid: 'CFxxxxxx',
        participants: [
          {
            participantType: 'worker',
            workerSid: 'flex-selector-test-id',
            callSid: 'CAxxxx',
          },
        ],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined',
              },
              routingProperties: {
                workerSid: 'flex-selector-test-id',
              },
            },
          ],
        },
      },
    };
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={mockTask} />);
    const bargeBtn = getByTestId('bargeBtn');
    expect(bargeBtn).toBeEnabled();
    await userEvent.click(bargeBtn);
    expect(updateParticipantBargeCoachSpy).toHaveBeenCalled();
  });

  it('call bargeHandleClick error due to mismatching workerSID', async () => {
    const mockErrorTask = {
      conference: {
        conferenceSid: 'CFxxxxxx',
        participants: [
          {
            participantType: 'worker',
            workerSid: 'WKxxxx',
            callSid: 'CAxxxx',
          },
        ],
        source: {
          channelParticipants: [
            {
              participantSid: 'PAxxxx',
              type: 'supervisor',
              mediaProperties: {
                status: 'joined',
              },
              routingProperties: {
                workerSid: 'WKxxx',
              },
            },
          ],
        },
      },
    };
    console.log('call bargeHandleClick error due to mismatching workerSID Error 1')
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={mockErrorTask} />);
    console.log('call bargeHandleClick error due to mismatching workerSID Error 2')
    const bargeBtn = getByTestId('bargeBtn');
    expect(bargeBtn).toBeEnabled();
    await userEvent.click(bargeBtn);
    //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
  });
  it('call bargeHandleClick error due to no conferenceSID', async () => {
    console.log('call bargeHandleClick error due to no conferenceSID Error 1')
    const consoleSpy = jest.spyOn(console, 'log');
    console.log('call bargeHandleClick error due to no conferenceSID Error 2')
    const mockErrorTask = {};
    const { getByTestId } = render(<SupervisorBargeCoachButtons task={mockErrorTask} />);
    console.log('call bargeHandleClick error due to no conferenceSID Error 3')
    const bargeBtn = getByTestId('bargeBtn');
    expect(bargeBtn).toBeEnabled();
    await userEvent.click(bargeBtn);
    expect(consoleSpy).toHaveBeenCalledWith('conferenceSid = null, returning');
  });
});
