import * as Flex from "@twilio/flex-ui";
import { ParticipantType } from "@twilio/flex-ui/src/state/Conferences";
import { Actions as BargeCoachStatusAction } from "../../flex-hooks/states/SupervisorBargeCoach";
import { isFeatureEnabled, isAgentCoachingPanelEnabled, isSupervisorMonitorPanelEnabled } from '../..';
import { reduxNamespace } from "../../states";
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from "../../utils/ErrorManager";
// Import to get Sync Doc updates
import { SyncDoc } from "../../utils/sync/Sync";
import Analytics, { Event } from "../../utils/Analytics";

export const enableBargeCoachButtonsUponMonitor = async (
  flex: typeof Flex,
  manager: any
) => {
  try {


    if (!isFeatureEnabled()) return;
    // Listening for supervisor to monitor the call to enable the
    // barge and coach buttons, as well as reset their muted/coaching states
    flex.Actions.addListener("afterMonitorCall", (payload) => {
      console.log(
        `Monitor button triggered, enable the Coach and Barge-In Buttons`
      );
      manager.store.dispatch(
        BargeCoachStatusAction.setBargeCoachStatus({
          enableCoachButton: true,
          coaching: false,
          enableBargeinButton: true,
          muted: true,
        })
      );

      // If the Supervisor Monitor Panel feature is enabled, we want to update the Sync Doc that we are monitoring
      // However we do not want to if privateMode is enabled by the Supervisor
      if (!isSupervisorMonitorPanelEnabled()) return;
      const { privateMode } =
        manager.store.getState()[reduxNamespace].supervisorBargeCoach;
      if (privateMode) return;

      const myWorkerSID = manager.store.getState().flex?.worker?.worker?.sid;
      const agentWorkerSID =
        manager.store.getState().flex?.supervisor?.stickyWorker?.worker?.sid;
      const supervisorFN =
        manager.store.getState().flex?.worker?.attributes?.full_name;
      const conferenceSID = payload.task?.conference?.conferenceSid;
      const supervisorParticipant =
      payload.task?.conference?.source?.channelParticipants?.find(
        (p: any) =>
          p.type === ("supervisor" as ParticipantType) &&
          p.mediaProperties.status === "joined" &&
          myWorkerSID === p.routingProperties.workerSid
      );
      const participantSid = supervisorParticipant?.participantSid;
      let agentParticipant = payload.task?.conference?.participants?.find(
      (p: any) =>
        p.participantType === "worker" && agentWorkerSID === p.workerSid
      );
      const agentSid = agentParticipant?.callSid;

      Analytics.track(Event.CALL_START_MONITOR, {
        conferenceSid: conferenceSID,
        participantSid,
        agentSid,
      });

      SyncDoc.initSyncDoc(
        agentWorkerSID,
        conferenceSID,
        myWorkerSID,
        supervisorFN,
        "is Monitoring",
        "add"
      );
    });
  } catch (e) {
    ErrorManager.createAndProcessError("Could not add 'afterMonitorCall' listener", {
      type: FlexPluginErrorType.action,
      description: e instanceof Error ? `${e.message}` : "Could not add 'afterMonitorCall' listener",
      context: "Plugin.Action.afterMonitorCall",
      wrappedError: e
    });
  }
};

export const disableBargeCoachButtonsUponMonitor = async (
  flex: typeof Flex,
  manager: Flex.Manager
) => {
  try {
    if (!isFeatureEnabled()) return;
    // Listening for supervisor to click to unmonitor the call to disable the
    // barge and coach buttons, as well as reset their muted/coaching states
    flex.Actions.addListener("afterStopMonitoringCall", (payload) => {
      console.log(
        `Unmonitor button triggered, disable the Coach and Barge-In Buttons`
      );
      manager.store.dispatch(
        BargeCoachStatusAction.setBargeCoachStatus({
          enableCoachButton: false,
          coaching: false,
          enableBargeinButton: false,
          muted: true,
          barge: false,
        })
      );

      // If the Agent Coaching Panel and Supervisor Monitor Panel are disabled, we can skip otherwise
      // We need to update the Sync Doc to remove the Supervisor after they unmonitor the call
      if (!isAgentCoachingPanelEnabled() && !isSupervisorMonitorPanelEnabled()) return;

      const myWorkerSID = manager.store.getState().flex?.worker?.worker?.sid;
      const agentWorkerSID =
        manager.store.getState().flex?.supervisor?.stickyWorker?.worker?.sid;
      const supervisorFN =
        manager.store.getState().flex?.worker?.attributes?.full_name;
      SyncDoc.initSyncDoc(
        agentWorkerSID,
        "",
        myWorkerSID,
        supervisorFN,
        "",
        "remove"
      );
    });
  } catch (e) {
    ErrorManager.createAndProcessError("Could not add 'afterStopMonitoringCall' listener", {
      type: FlexPluginErrorType.action,
      description: e instanceof Error ? `${e.message}` : "Could not add 'afterStopMonitoringCall' listener",
      context: "Plugin.Action.afterStopMonitoringCall",
      wrappedError: e
    });
  }
};
