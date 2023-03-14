import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { Actions as BargeCoachStatusAction, } from '../../flex-hooks/states/SupervisorBargeCoach';
import { isFeatureEnabled, isAgentCoachingPanelEnabled } from '../..';

import { SyncDoc } from '../../utils/sync/Sync';
import SupervisorBargeCoachButton from '../../components/BargeCoachButtons';
import SupervisorPrivateToggle from '../../components/SupervisorPrivateModeButton';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from "../../utils/ErrorManager";


export function addSupervisorBargeCoachButtons(flex: typeof Flex, manager: Flex.Manager) {
  try {
    if (!isFeatureEnabled()) return;


    // Add the Barge-in and Coach Option
    flex.Supervisor.TaskOverviewCanvas.Content.add(<SupervisorBargeCoachButton key="bargecoach-buttons" />);

    // We will lose the stickyWorker attribute that we use for agentWorkerSID (see \components\SupervisorBargeCoachButton.js for reference)
    // We need to invoke an action to trigger this again, so it populates the stickyWorker for us 
    const agentWorkerSID = manager.store.getState().flex?.supervisor?.stickyWorker?.worker?.sid;
    const teamViewTaskSID = localStorage.getItem('teamViewTaskSID');
    // Check that the stickyWorker is null and that we are attempting to restore the last worker they monitored
    if (agentWorkerSID == null && teamViewTaskSID != null) {

      console.log(`teamViewSID = ${teamViewTaskSID}`);

      // Invoke action to trigger the monitor button so we can populate the stickyWorker attribute
      console.log(`Triggering the invokeAction`);
      Flex.Actions.invokeAction("SelectTaskInSupervisor", { sid: teamViewTaskSID });

      // If agentSyncDoc exists, clear the Agent Sync Doc to account for the refresh
      const agentSyncDoc = localStorage.getItem('agentSyncDoc');
      if (agentSyncDoc != null) {
        SyncDoc.clearSyncDoc(agentSyncDoc);
      }

      // This is here if the Supervisor refreshes and has toggled alerts to false
      // By default alerts are enabled unless they toggle it off
      const privateToggle = localStorage.getItem('privateToggle');
      if (privateToggle === "true") {
        manager.store.dispatch(BargeCoachStatusAction.setBargeCoachStatus({
          privateMode: true,
        }));
      }
    }

    if (!isAgentCoachingPanelEnabled()) return;
    // Add the Supervisor Private Mode Toggle
    flex.Supervisor.TaskOverviewCanvas.Content.add(<SupervisorPrivateToggle key="supervisorprviate-button" />);
  } catch (e) {
    ErrorManager.createAndProcessError("Could not add content for Flex component", {
      type: FlexPluginErrorType.programabelComponents,
      description: e instanceof Error ? `${e.message}` : "Could not add content for Flex component",
      context: "Plugin.Component.TaskOverviewCanvas",
      wrappedError: e
    });
  }
}
