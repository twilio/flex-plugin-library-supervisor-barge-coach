import * as Flex from "@twilio/flex-ui"
import { addSupervisorCoachingPanelToAgent } from '../CallCanvas'
import '@testing-library/jest-dom'
//import "jest-styled-components";

jest.mock('../../actions/reservation', () => {
    return {
        cleanStateAndSyncUponAgentHangUp:jest.fn()
    };
});
jest.mock('../../..',()=>{
    return {
        isAgentCoachingPanelEnabled:()=>true
    }
})

describe('add transfer button',()=>{
    let flex: typeof Flex = Flex;
    let manager: Flex.Manager = Flex.Manager.getInstance();

    it('Call canvas added',async()=>{
        const addContentSpy = jest.spyOn(Flex.CallCanvas.Content, 'add');
        addSupervisorCoachingPanelToAgent(flex, manager);
        expect(addContentSpy).toHaveBeenCalledTimes(1);
    })
})