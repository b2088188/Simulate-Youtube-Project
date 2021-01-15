import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ChannelActionContext = createContext();
ChannelActionContext.displayName = 'ChannelActionContext';

export const ChannelActionProvider = ChannelActionContext.Provider;

/* eslint-disable */
export const useChannelActions = useContextFactory('ChannelActionContext', ChannelActionContext);

export default ChannelActionContext;
