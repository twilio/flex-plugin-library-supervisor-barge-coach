import { cleanStateAndSyncUponAgentHangUp } from '../reservation';
import '@testing-library/jest-dom';
// import "jest-styled-components";
import * as Flex from '@twilio/flex-ui';
import { SyncDoc } from '../../../utils/sync/Sync';

jest.mock('../../../index', () => {
  return {
    isFeatureEnabled: () => {
      return true;
    },
    isSupervisorMonitorPanelEnabled: () => {
      return true;
    },
    isAgentCoachingPanelEnabled: () => {
      return true;
    },
  };
});

jest.mock('../../../utils/sync/Sync', () => {
  return {
    SyncDoc: {
      initSyncDoc: jest.fn(),
    },
  };
});

describe('enable or disable BargeCoachButtonsUponMonitor', () => {
  //const actionSpy = jest.spyOn(SyncDoc, 'initSyncDoc');
  const flex: typeof Flex = Flex;
  const manager: Flex.Manager = Flex.Manager.getInstance();
  it('clean state and sync upon agent hangup', async () => {
    const listenerSpy = jest.spyOn(Flex.Actions, 'addListener');
    await cleanStateAndSyncUponAgentHangUp(flex, manager);
  });
});
