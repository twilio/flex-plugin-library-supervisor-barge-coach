import * as Flex from '@twilio/flex-ui';
import React from 'react';
import SupervisorMonitorPanel from '../../components/SupervisorMonitorPanel';
import { SyncDoc } from '../../utils/sync/Sync';
import { isSupervisorMonitorPanelEnabled } from '../..';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from "../../utils/ErrorManager";

export function addSupervisorMonitorPanel(flex: typeof Flex, manager: Flex.Manager) {
  try {
    if (!isSupervisorMonitorPanelEnabled()) return;

    flex.Supervisor.TaskCanvasTabs.Content.add(<SupervisorMonitorPanel uniqueName="Supervisors Engaged" icon="AgentsBold" key="supervisoronitorpanel" />);

    // If myWorkerSID exists, clear the Agent Sync Doc to account for the refresh
    const myWorkerSID = localStorage.getItem('myWorkerSID');
    if (myWorkerSID != null) {
      SyncDoc.clearSyncDoc(myWorkerSID);
    }
  } catch (e) {
    ErrorManager.createAndProcessError("Could not add content for Flex component", {
      type: FlexPluginErrorType.programabelComponents,
      description: e instanceof Error ? `${e.message}` : "Could not add content for Flex component",
      context: "Plugin.Component.TaskCanvasTabs",
      wrappedError: e
    });
  }
}
