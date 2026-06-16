import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(2);
// H.264 MP4 is the default codec; kept explicit for clarity.
Config.setCodec("h264");
