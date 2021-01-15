import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const VideoActionContext = createContext();
VideoActionContext.displayName = 'VideoActionContext';

export const VideoActionProvider = VideoActionContext.Provider;

/* eslint-disable */
export const useVideoActions = useContextFactory('VideoActionContext', VideoActionContext);

export default VideoActionContext;
