import * as Flex from '@twilio/flex-ui';
import React from 'react';
import CoachingStatusPanel from '../../components/CoachingStatusPanel'
import { cleanStateAndSyncUponAgentHangUp } from '../actions/reservation';
import { SyncDoc } from '../../utils/sync/Sync';
import { isAgentCoachingPanelEnabled } from '../..';

export function addSupervisorCoachingPanelToAgent(flex: typeof Flex, manager: Flex.Manager) {

  if(!isAgentCoachingPanelEnabled()) return;
  // Adding Coaching Status Panel to notify the agent who is Coaching them
  flex.CallCanvas.Content.add(<CoachingStatusPanel key="coaching-status-panel"> </CoachingStatusPanel>, {sortOrder: -1});

    // If myWorkerSID exists, clear the Agent Sync Doc to account for the refresh
    const myWorkerSID = localStorage.getItem('myWorkerSID');
    if(myWorkerSID != null) {
      SyncDoc.clearSyncDoc(myWorkerSID);
    }

    // Add a Listener to ReservationCreated
    cleanStateAndSyncUponAgentHangUp(flex, manager);
}
