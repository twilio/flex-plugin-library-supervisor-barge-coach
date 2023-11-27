<a  href="https://www.twilio.com">
<img  src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg"  alt="Twilio"  width="250"  />
</a>

# Supervisor Barge Coach Suite

This feature provides the ability for a Supervisor to barge in to a call (i.e. join an active call with an agent) or coach and agent (IE talk only to the agent where the caller(s) are unable to hear you), all from the Team's View.

There are addtiional features that have been added to allow the Agent to see who is actively coaching them along with giving the Supervisor the ability to go into a "private/incognito" mode if they wish to. The additional features require specific feature flags to be enabled, which we will review in the setup and dependencies section below.

# Flex User Experience

First select the call/worker you wish to monitor  
![Plugin Demo](screenshots/Supervisor-Barge-Coach-Plugin-1.gif)

Click the Monitor button to enable the Barge-In Button (Middle Button) and the Coach Button (Right Button)  
![Plugin Demo](screenshots/Supervisor-Barge-Coach-Plugin-2.gif)

Coach Status Panel to the Agent's UI. This UI change can be enabled/disabled by the below button
![Plugin Demo](screenshots/Supervisor-Barge-Coach-Plugin-3.gif)

There is a private toggle to enable/disable the agent's ability to see who is coaching them  
![Plugin Demo](screenshots/Supervisor-Barge-Coach-Plugin-4.gif)

There is also a Supervisor Monitor Panel, which gives the supervisors the ability to see if other supervisors are monitoring, coaching, or have joined (barged) the call. \*\*Note that the private toggle feature does apply to this feature as well. If a Supervisor has private mode on, they will not show up in the Supervisor Monitor Panel

![Plugin Demo](screenshots/Supervisor-Barge-Coach-Plugin-5.gif)

# Setup and Dependencies

There are no dependencies for setup beyond ensuring the flag is enabled within the flex-config attributes.

To enable the standard supervisor barge coach feature, under the flex-config attributes set the `supervisor_barge_coach` `enabled` flag to `true`.

To enable the Coach Status Panel and Private Toggle, set the `agent_coaching_panel` to `true`

To enable the Supervisor Monitor Panel, set the `supervisor_monitor_panel` to `true`

## Flex Plugin

This repository is a Flex plugin with some other assets. The following describing how you setup, develop and deploy your Flex plugin.

### Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install` at both 'root` and `ui-src` directory of the project:

```bash
cd

# If you use npm
npm install
```

### Development

In order to develop locally, you can use the Twilio CLI to run the plugin locally. Using your commandline run the following from the root dirctory of the plugin.

```bash
twilio flex:plugins:start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:3000`.

When you make changes to your code, the browser window will be automatically refreshed.

### Deploy

#### Plugin Deployment

Once you are happy with your plugin, you have to deploy then release the plugin for it to take affect on Twilio hosted Flex.

Rename `.env.example` at root of the project to `.env` , And fill the values as shown below:

```
TWILIO_ACCOUNT_SID =<YOUR_ACCOUNT_SID>
TWILIO_AUTH_TOKEN =<YOUR_AUTH_SID>
TWILIO_WORKSPACE_SID =<YOUR_WORKSPACE_SID>
```

Once the .env values are set, Start serverless deployment with below command at `root` of your project:

```bash
twilio serverless:deploy
```
Rename `.env.example` inside `ui-src` folder to `.env`.
If the serverless deployment was successful, you must see the Domain url which ends with `.twil.io`.
Copy the entire domain url and add that inside `.env` file of `ui-src` folder.

```
FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN=<DOMAIN_URL>
```

Run the following command on `ui-src` folder to start the deployment:

```bash
twilio flex:plugins:deploy --major --changelog "Notes for this version" --description "Functionality of the plugin"
```

After your deployment runs you will receive instructions for releasing your plugin from the bash prompt. You can use this or skip this step and release your plugin from the Flex plugin dashboard here https://flex.twilio.com/admin/plugins

For more details on deploying your plugin, refer to the [deploying your plugin guide](https://www.twilio.com/docs/flex/plugins#deploying-your-plugin).

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.

## Twilio Serverless

You will need the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) and the [serverless plugin](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started) to deploy the functions inside the `serverless` folder of this project. You can install the necessary dependencies with the following commands:

`npm install twilio-cli -g`

and then

`twilio plugins:install @twilio-labs/plugin-serverless`


# Local Testing

To test this functionality locally, it is helpful to setup an [SSO configuration](https://www.twilio.com/docs/flex/admin-guide/setup/sso-configuration) to login as an `agent` role in one Flex session, and a `supervisor` or `admin` role in another tab/browser.

# How does it work?

This plugin adds a barge-in and coach button to the Monitor call canvas. You can get to this via the Team View, click on the agent you wish to monitor and the buttons will be available once you begin to monitor the live calls. The left button is the Barge-In button which allows you to join the conference all with the agent(s) and customer(s). Toggling this button will mute/unmute yourself. The right button is the Coach button which allows you to talk to the agent you are monitoring. The no other member of the call will be able to hear you except for the monitored agent. Toggling this button enables Coach and the left button converts to a Mute/Un-Mute button for the coaching mode.

Some additional features have been added to give the ability for the agent to see who is coaching them, and the ability for the supervisor to get into a "private mode" if they wish to not be shown (this applies to both the agent coach panel and supervisor monitor panel features). The latest version has added the ability for Supervisors to see who may be actively monitoring, coaching, and have joined (barged) the call. See the # setup and dependancies section on enabling the additional features.

