"use client"
/**
 * VideoContentYT component renders a YouTube video player or thumbnail.
 *
 * Taken from https://octanium91.github.io/p/optimization-video/e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855/VideoContentYT.js
 *
 * @component
 * @example
 * <VideoContentYT src="LXb3EKWsInQ" params={{autoPlay: true}} />
 *
 * @param {string} src - Source of content. Can be: YouTube video hash/code (example: LXb3EKWsInQ) or YouTube video URL (example: https://www.youtube.com/watch?v=LXb3EKWsInQ or https://youtu.be/LXb3EKWsInQ or https://www.youtube.com/embed/LXb3EKWsInQ)
 * @param {object} [params] - Object with parameters.
 * @param {boolean} [params.autoPlay] - Set 'true' for autoplay video after pressing the play button.
 * @param {string} [params.thumbnailQuality] - YouTube video preview quality. Can be: default, hq, mq, sd, maxres.
 * @param {string} [params.title] - Image title.
 * @param {string} [params.className] - Custom class name.
 */
import { Component } from 'react';


type ThumbnailQuality = "default" | "hq" | "mq" | "sd" | "maxres"

interface VideoContentProps {
    src: string;
    params?: {
        title?: string;
        className?: string;
        autoPlay?: boolean;
        thumbnailQuality?: ThumbnailQuality;
    };
}

// Define the interface for state
interface VideoContentState {
    firstLoad: boolean;
    autoPlay: boolean;
    playBtnRed: boolean;
    title: string;
    className: string;
    videoId: string;
    thumbnailQuality: ThumbnailQuality;
    showContent: boolean;
}

// Define the class component
export default class VideoContentYoutube extends Component<VideoContentProps, VideoContentState> {
    state: VideoContentState = {
        firstLoad: false,
        autoPlay: false,
        playBtnRed: false,
        title: "",
        className: "",
        videoId: "",
        thumbnailQuality: "maxres",
        showContent: false
    };

    render() {
        const { src = "", params = {}} = this.props;

        if (!this.state.firstLoad) {

            let localState = this.state;

            const thumbnailQuality = {default: "default", hq: "hqdefault", mq: "mqdefault", sd: "sddefault", maxres: "maxresdefault"};
            let findInUrl = false;
            if (src.indexOf("youtube") !== -1 && src.indexOf("watch") !== -1) {
                findInUrl = true;
                try {
                    // @ts-ignore
                    localState.videoId = new URLSearchParams(new URL(src).search).get("v");
                } catch {
                    try {
                        // @ts-ignore
                        localState.videoId = new URLSearchParams(new URL("https://"+src).search).get("v");
                    } catch {return(<div>error loading, wrong URL...</div>)}};
            };

            if (src.indexOf("youtube") !== -1 && src.indexOf("embed") !== -1) {
                findInUrl = true;
                try {
                    localState.videoId = new URL(src).pathname.replace('/embed/', '');
                } catch {
                    try {
                        localState.videoId = localState.videoId = new URL("https://"+src).pathname.replace('/embed/', '');
                    } catch {return(<div>error loading, wrong URL...</div>)}};
            };

            if (src.indexOf("youtu.be") !== -1) {
                findInUrl = true;
                try {
                    localState.videoId = new URL(src).pathname.replace('/', '');
                } catch {
                    try {
                        localState.videoId = new URL("https://"+src).pathname.replace('/', '');
                    } catch {return(<div>error loading, wrong URL...</div>)}};
            };

            if (!findInUrl) {
                localState.videoId = src;
            } else {
                if (!this.state.videoId) {
                    localState.firstLoad = true;
                    return(<div>error loading, not found video ID...</div>);
                };
            };

            if (params.hasOwnProperty("title")) {
                // @ts-ignore
                localState.title = params.title;
            } else {
                localState.title = "Video from YouTube";
            };
            if (params.hasOwnProperty("className")) {
                // @ts-ignore
                localState.className = params.className;
            } else {
                localState.className = "VideoContent__"+this.state.videoId;
            };
            if (params.hasOwnProperty("autoPlay")) {
                // @ts-ignore
                localState.autoPlay = params.autoPlay;
            };
            if (params.hasOwnProperty("thumbnailQuality")) {
                // @ts-ignore
                if (params.thumbnailQuality === "auto") {
                    // @ts-ignore
                    localState.thumbnailQuality = "maxresdefault";
                } else {
                    try {
                        // @ts-ignore
                        localState.thumbnailQuality = thumbnailQuality[params.thumbnailQuality];
                    } catch {
                        // @ts-ignore
                        localState.thumbnailQuality = "maxresdefault";
                    };
                };
            } else {
                // @ts-ignore
                localState.thumbnailQuality = "maxresdefault";
            };

            localState.firstLoad = true;

        };


        return (
                <div className={this.state.className+ " " + "__iframeVideo"} style={{position: "relative",width:"100%",height:"0",paddingBottom:"56.25%"}}>
                    <iframe
                        allowFullScreen={true}
                        className={this.state.className+"__iframe"}
                        style={{maxWidth: "100%", width:"100%", position:"absolute", left:"0"}}
                        key={"vc_"+this.state.videoId+"__iframe"}
                        title={this.state.title}
                        loading="lazy"
                        // alt={this.state.title}
                        src={this.state.autoPlay
                        ? "https://www.youtube.com/embed/"+this.state.videoId+"?rel=0&showinfo=false&autoplay=true"
                                : "https://www.youtube.com/embed/"+this.state.videoId+"?rel=0&showinfo=false&autoplay=true"} allow='autoplay; encrypted-media' width="100%"
                            height="100%" frameBorder={0} />
                </div>
            );
    };
}


