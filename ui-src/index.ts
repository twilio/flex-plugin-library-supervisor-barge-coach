import { getFeatureFlags } from './utils/configuration';

import * as Flex from "@twilio/flex-ui";
import * as FlexPlugin from '@twilio/flex-plugin';
import SupervisorBargeCoachPlugin from './SupervisorBargeCoachPlugin';

//const { enabled = false, agent_coaching_panel = false, supervisor_monitor_panel = false } = getFeatureFlags()?.features?.supervisor_barge_coach || {};

export const isFeatureEnabled = () => {
  //ToDO
  return true;
  //return enabled;
};

export const isAgentCoachingPanelEnabled = () => {
  return true;
  //return enabled && agent_coaching_panel;
};

export const isSupervisorMonitorPanelEnabled = () => {
  return true;
  //return enabled && supervisor_monitor_panel;
};

FlexPlugin.loadPlugin(SupervisorBargeCoachPlugin);
