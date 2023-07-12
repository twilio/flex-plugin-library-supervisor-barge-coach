import { disableBargeCoachButtonsUponMonitor, enableBargeCoachButtonsUponMonitor } from '../MonitorCall';
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
  it('adds afterMonitorCall listener for enable bargeCoach', async () => {
    const listenerSpy = jest.spyOn(Flex.Actions, 'addListener');
    await enableBargeCoachButtonsUponMonitor(flex, manager);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('should call initSyncDoc with correct parameters for enable scenario', async () => {
    const payload = {
      task: {
        conference: {
          conferenceSid: 'CFxxxxx',
        },
      },
    };
    const addListenerSpy = jest.spyOn(Flex.Actions, 'addListener');
    await enableBargeCoachButtonsUponMonitor(flex, manager);
    flex.Actions.invokeAction('MonitorCall', payload);
    expect(addListenerSpy).toHaveBeenCalledTimes(1);
  });
  it('adds afterMonitorCall listener for disable bargeCoach', async () => {
    const listenerSpy = jest.spyOn(Flex.Actions, 'addListener');
    await disableBargeCoachButtonsUponMonitor(flex, manager);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('should call initSyncDoc with correct parameters for disbale scenario', async () => {
    const payload = {
      task: {
        conference: {
          conferenceSid: 'CFxxxxx',
        },
      },
    };
    const addListenerSpy = jest.spyOn(Flex.Actions, 'addListener');
    await disableBargeCoachButtonsUponMonitor(flex, manager);
    flex.Actions.invokeAction('StopMonitoringCall', payload);
    expect(addListenerSpy).toHaveBeenCalledTimes(1);
  });
});
