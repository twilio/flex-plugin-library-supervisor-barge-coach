import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import BargeCoachService from '../../../utils/serverless/BargeCoachService';
import { SupervisorPrivateToggle } from '../SupervisorPrivateModeButtonComponent';

jest.mock('react-redux', () => ({
    useSelector: () => ({
      barge: true,
      coaching: true,
      privateMode: true
    }),
    useDispatch: () => jest.fn()
  }));
  jest.mock('../../../utils/sync/Sync', () => ({
    SyncDoc:{
        initSyncDoc:jest.fn()
    }
}))

  describe('Supervisor private button',()=>{
    it('renders the snapshot correctly',()=>{
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
            <SupervisorPrivateToggle task={mockTask} />
          )
          expect(wrapper).toMatchSnapshot();
    })
    it('call coachHandleClick successfully', async () => {
      const user = userEvent.setup();
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
          <SupervisorPrivateToggle task={mockTask} />
        )
        const togglePrivateBtn = getByTestId('togglePrivateBtn');
        expect(togglePrivateBtn).toBeEnabled();
        await user.click(togglePrivateBtn);
        //expect(CallbackService.callCustomerBack).toHaveBeenCalled();
      });
  })