import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import BargeCoachService from '../../../utils/serverless/BargeCoachService';
import { CoachingStatusPanel } from '../CoachingStatusPanelComponent';

jest.mock('../../../utils/serverless/BargeCoachService');
jest.mock('react-redux', () => ({
  useSelector: () => ({
    supervisorArray:[
        {
            status:'is Monitoring'
        }
    ],
    syncSubscribed:false
  }),
  useDispatch: () => jest.fn()
}));
jest.mock('../../../utils/sync/Sync', () => ({
    SyncDoc:{
        getSyncDoc:()=>Promise.resolve({
            data:{
                supervisors:[
                    {
                        status:'is Monitoring'
                    }
                ]
            },
            on:jest.fn()
        })
    }
}))

describe('Coaching status panel',()=>{
    it('renders correct snapshot',()=>{
        const wrapper = render(
            <CoachingStatusPanel {...{}} />
          )
          expect(wrapper).toMatchSnapshot();
    })
})