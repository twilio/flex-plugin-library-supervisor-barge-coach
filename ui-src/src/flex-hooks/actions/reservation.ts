import * as Flex from '@twilio/flex-ui';
import { Actions as BargeCoachStatusAction } from '../states/SupervisorBargeCoach';
import { isAgentCoachingPanelEnabled } from '../..';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from '../../utils/ErrorManager';
// Import to get Sync Doc updates
import { SyncDoc } from '../../utils/sync/Sync';

export const cleanStateAndSyncUponAgentHangUp = async (flex: typeof Flex, manager: Flex.Manager) => {
  try {
    // If agent_coaching_panel feature is true proceed, otherwise we will not subscribe to the Sync Doc
    if (!isAgentCoachingPanelEnabled()) return;

    // Listening for agent to hang up the call so we can clear the Sync Doc
    // for the CoachStatePanel feature
    manager.workerClient?.on('reservationCreated', (reservation: any) => {
      //Register listener for reservation wrapup event
      reservation.on('wrapup', (reservation: any) => {
        console.log(`Hangup button triggered ${reservation}, clear the Sync Doc`);
        manager.store.dispatch(
          BargeCoachStatusAction.setBargeCoachStatus({
            enableCoachButton: false,
            coaching: false,
            enableBargeinButton: false,
            muted: true,
          }),
        );
        const agentWorkerSID = manager.store.getState().flex?.worker?.worker?.sid;
        const agentSyncDoc = `syncDoc.${agentWorkerSID}`;
        // Let's clear the Sync Document and also close/end our subscription to the Document
        SyncDoc.clearSyncDoc(agentSyncDoc);
        SyncDoc.closeSyncDoc(agentSyncDoc);
      });
    });
  } catch (e) {
    ErrorManager.createAndProcessError("Could not add 'reservationCreated' listener", {
      type: FlexPluginErrorType.action,
      description: e instanceof Error ? `${e.message}` : "Could not add 'reservationCreated' listener",
      context: 'Plugin.Action.reservationCreated',
      wrappedError: e,
    });
  }
};
