import * as Flex from "@twilio/flex-ui"
import { addSupervisorBargeCoachButtons } from '../TaskOverviewCanvas'
import '@testing-library/jest-dom';

jest.mock('../../..',()=>{
    return {
        isFeatureEnabled:()=>true,
        isAgentCoachingPanelEnabled:()=>true
    }
})

describe('add task canvas',()=>{
    let flex: typeof Flex = Flex;
    let manager: Flex.Manager = {
        store:{
            getState:()=>({
                flex:{
                    supervisor:{
                        stickyWorker:{
                            worker:{
                                sid:null
                            }
                        }
                    }
                }
            }),
            dispatch:jest.fn()
        }
    };
    localStorage.setItem('teamViewTaskSID','TVTxxxx');
    localStorage.setItem('agentSyncDoc','ASDxxx')
    localStorage.setItem('privateToggle','true')
    it('Task canvas Tabs',async()=>{
        const addContentSpy = jest.spyOn(Flex.Supervisor.TaskOverviewCanvas.Content, 'add');
        addSupervisorBargeCoachButtons(flex, manager);
        expect(addContentSpy).toHaveBeenCalledTimes(1);
        localStorage.removeItem('teamViewTaskSID');
        localStorage.removeItem('agentSyncDoc')
        localStorage.removeItem('privateToggle')
    })
})