import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ChannelStateContext = createContext();
const ChannelActionContext = createContext();
ChannelStateContext.displayName = 'ChannelStateContext';
ChannelActionContext.displayName = 'ChannelActionContext';
export const ChannelStateProvider = ChannelStateContext.Provider;
export const ChannelActionProvider = ChannelActionContext.Provider;
/* eslint-disable */
const useChannelState = useContextFactory('ChannelStateContext', ChannelStateContext);
const useChannelActions = useContextFactory('ChannelActionContext', ChannelActionContext);
const useChannel = () => [useChannelState(), useChannelActions()];
export default useChannel;
