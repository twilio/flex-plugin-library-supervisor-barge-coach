import FlexTelemetry from '@twilio/flex-ui-telemetry';
import packageJSON from '../../package.json';

export enum Event {
  CALL_START_MONITOR = 'Call Start Monitor',
  CALL_START_BARGE = 'Call Start Barge',
  CALL_START_COACH = 'Call Start Coach',
}

export const Analytics = new FlexTelemetry({
  source: 'flexui',
  role: packageJSON.name,
  plugin: packageJSON.name,
  pluginVersion: packageJSON.version,
  originalPluginName: packageJSON.id,
});
