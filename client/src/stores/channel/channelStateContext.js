import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ChannelStateContext = createContext();
ChannelStateContext.displayName = 'ChannelStateContext';

export const ChannelStateProvider = ChannelStateContext.Provider;

/* eslint-disable */
export const useChannelState = useContextFactory('ChannelStateContext', ChannelStateContext);

export default ChannelStateContext;