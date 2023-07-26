import * as Flex from '@twilio/flex-ui';
import { addSupervisorMonitorPanel } from '../TaskCanvasTabs';
import '@testing-library/jest-dom';
//import "jest-styled-components";

jest.mock('../../actions/reservation', () => {
  return {
    cleanStateAndSyncUponAgentHangUp: jest.fn(),
  };
});
jest.mock('../../..', () => {
  return {
    isSupervisorMonitorPanelEnabled: () => true,
  };
});

describe('add task canvas', () => {
  const flex: typeof Flex = Flex;
  const manager: Flex.Manager = Flex.Manager.getInstance();

  it('Task canvas Tabs', async () => {
    const addContentSpy = jest.spyOn(Flex.Supervisor.TaskCanvasTabs.Content, 'add');
    addSupervisorMonitorPanel(flex, manager);
    expect(addContentSpy).toHaveBeenCalledTimes(1);
  });
});
