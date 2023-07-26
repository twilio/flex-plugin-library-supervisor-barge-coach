import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SupervisorMonitorPanel } from '../SupervisorMonitorPanelComponent';

jest.mock('../../../utils/serverless/BargeCoachService');
jest.mock('react-redux', () => ({
  useSelector: () => ({
    supervisorArray: [
      {
        status: 'is Monitoring',
      },
    ],
    syncSubscribed: false,
  }),
  useDispatch: () => jest.fn(),
}));
jest.mock('../../../utils/sync/Sync', () => ({
  SyncDoc: {
    getSyncDoc: () =>
      Promise.resolve({
        data: {
          supervisors: [
            {
              status: 'is Monitoring',
            },
          ],
        },
        on: jest.fn(),
      }),
  },
}));
describe('Supervisor Monitor panel', () => {
  it('renders correct snapshot', () => {
    const wrapper = render(<SupervisorMonitorPanel {...{ icon: '123', uniqueName: '123' }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
