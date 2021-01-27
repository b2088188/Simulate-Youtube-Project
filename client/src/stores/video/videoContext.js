import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const VideoStateContext = createContext();
const VideoActionContext = createContext();
VideoStateContext.displayName = 'VideoStateContext';
VideoActionContext.displayName = 'VideoActionContext';

export const VideoStateProvider = VideoStateContext.Provider;
export const VideoActionProvider = VideoActionContext.Provider;
/* eslint-disable */
const useVideoState = useContextFactory('VideoStateContext', VideoStateContext);
const useVideoActions = useContextFactory('VideoActionContext', VideoActionContext);
const useVideo = () => [useVideoState(), useVideoActions()];
export default useVideo;
