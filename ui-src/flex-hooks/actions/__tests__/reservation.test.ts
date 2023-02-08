import { disableBargeCoachButtonsUponMonitor, enableBargeCoachButtonsUponMonitor } from '../MonitorCall'
import '@testing-library/jest-dom'
// import "jest-styled-components";
import * as Flex from '@twilio/flex-ui';
import { SyncDoc } from "../../../utils/sync/Sync";

jest.mock('../../../index', () => {
    return {
        isFeatureEnabled: () => { return true },
        isSupervisorMonitorPanelEnabled: () => { return true },
        isAgentCoachingPanelEnabled:()=>{return true}
    };
});

jest.mock('../../../utils/sync/Sync', () => {
    return {
        SyncDoc: {
            initSyncDoc: jest.fn()
        }
    };
});

describe('enable or disable BargeCoachButtonsUponMonitor', () => {
    //const actionSpy = jest.spyOn(SyncDoc, 'initSyncDoc');
    let flex: typeof Flex = Flex;
    let manager: Flex.Manager = Flex.Manager.getInstance();
})