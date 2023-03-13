import * as FlexPlugin from '@twilio/flex-plugin';
import SupervisorBargeCoachPlugin from './SupervisorBargeCoachPlugin';

export const isFeatureEnabled = () => {
  return true;
};

export const isAgentCoachingPanelEnabled = () => {
  return true;
};

export const isSupervisorMonitorPanelEnabled = () => {
  console.log('supervisor panel enabled')
  return true;
};

FlexPlugin.loadPlugin(SupervisorBargeCoachPlugin);
