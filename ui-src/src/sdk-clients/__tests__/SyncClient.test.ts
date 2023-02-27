import SyncClient from '../SyncClient';
import * as Flex from '@twilio/flex-ui';

jest.mock('../sync/SyncClient',()=>{
    return{
        updateToken:jest.fn()
    }
})

describe('Sync Client', () => {
    let flex: typeof Flex = Flex;
    let manager: Flex.Manager = Flex.Manager.getInstance();
    it('adds tokenUpdated listener for sync', async () => {
        const listenerSpy = jest.spyOn(manager.events, 'addListener');
        SyncClient(flex, manager);
        expect(listenerSpy).toHaveBeenCalled();
    });
})