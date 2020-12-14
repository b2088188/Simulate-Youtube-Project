import {createContext} from 'react';

const ChannelContext = createContext();

export const ChannelProvider = ChannelContext.Provider;

export default ChannelContext;