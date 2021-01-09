import { createContext } from "react";
import useContextFactory from "../../customhooks/useContextFactory";

const VideoStateContext = createContext();
VideoStateContext.displayName = "VideoStateContext";

export const VideoStateProvider = VideoStateContext.Provider;

/* eslint-disable */
export const useVideoState = useContextFactory(
  "VideoStateContext",
  VideoStateContext
);

export default VideoStateContext;
