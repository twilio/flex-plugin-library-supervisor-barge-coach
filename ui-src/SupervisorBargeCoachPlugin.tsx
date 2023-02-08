import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { enableBargeCoachButtonsUponMonitor } from './flex-hooks/actions/MonitorCall';
import { cleanStateAndSyncUponAgentHangUp } from './flex-hooks/actions/reservation';
import { addSupervisorCoachingPanelToAgent } from './flex-hooks/components/CallCanvas';
import { addSupervisorMonitorPanel } from './flex-hooks/components/TaskCanvasTabs';
import { addSupervisorBargeCoachButtons } from './flex-hooks/components/TaskOverviewCanvas';
import SyncClient from './sdk-clients';

const PLUGIN_NAME = 'SupervisorBargeCoachPlugin';

export default class SupervisorBargeCoachPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    const initializers = [
        enableBargeCoachButtonsUponMonitor,
        cleanStateAndSyncUponAgentHangUp,
        addSupervisorCoachingPanelToAgent,
        addSupervisorMonitorPanel,
        addSupervisorBargeCoachButtons,
        SyncClient,
      
    ];

    initializers.forEach((initializer) => initializer(flex, manager));
  }
}