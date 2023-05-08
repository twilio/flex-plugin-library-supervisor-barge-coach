## Details

### How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- A supervisor can visit the [Teams view](https://flex.twilio.com/teams/) and select an agent in an active call and click the call Monitor button.
- Clicking the Monitor button enables the Barge and Coach buttons.
- Supervisor *Barge* is getting into a 3 way conference with the agent and the caller.
- *Coach* is a supervisor speaking to an agent privately while the caller can only hear the agent.
- Supervisor can also toggle private mode.

### Installation
During installation, 2 fields are required:

 1. *TaskRouter Workspace SID*: This is the SID of the "Flex Task Assignment" workspace that you see in [Twilio Console > TaskRouter > Workspaces](https://console.stage.twilio.com/us1/develop/taskrouter/workspaces). Please refer screenshot below:

![Workspace Sid example](https://raw.githubusercontent.com/twilio/flex-plugin-library-supervisor-barge-coach/main/screenshots/taskrouter.png)

 2. *TaskRouter Chat Transfer Workflow SID*: You may want to create a new TaskRouter workflow for chat transfer or use the default workflow in [Twilio Console > TaskRouter > Workspaces > Flex Task Assignment](https://console.stage.twilio.com/us1/develop/taskrouter/workspaces) > Workflows > Assign to Anyone and get its SID.
