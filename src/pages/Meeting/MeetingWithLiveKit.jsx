import {
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  useTracks,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const serverUrl = import.meta.env.VITE_liveKit_server_url;

export default function Meeting({ token }) {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);

  const handleRedirect = (event) => {
    if (event.target.className === "lk-disconnect-button") {
      setTimeout(() => {
        navigate("/room");
      }, 1000);
    }
  };

  const handleStartRecording = async () => {
    try {
      // Request tab capture stream
      const tabStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "browser",
          cursor: "never",
        },
        audio: true,
        selfBrowserSurface: "include",
        systemAudio: "include",
        surfaceSwitching: "exclude",
        preferCurrentTab: true,
      });

      streamRef.current = tabStream;

      // Initialize MediaRecorder with the tab stream
      const mediaRecorder = new MediaRecorder(tabStream, {
        mimeType: "video/webm",
      });

      // Capture data chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      // Stop recording and automatically download the video
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "screen-recording.webm";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        recordedChunksRef.current = []; // Clear recorded chunks
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      // Listen for the 'ended' event on the stream
      tabStream.getVideoTracks()[0].addEventListener("ended", () => {
        handleStopRecording();
      });
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  };

  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      connect={true}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <div
        style={{
          position: "absolute",
          top: "15px",
          right: "4rem",
          zIndex: 1000,
        }}
      >
        {!isRecording ? (
          <button
            className="btn bg-[#2B2B2B] text-white"
            onClick={handleStartRecording}
          >
            Record
          </button>
        ) : (
          <button
            className="btn bg-pink-700 text-white animate-pulse"
            onClick={handleStopRecording}
          >
            {/* <span class="dot dot-error"></span> */}
            Recording...
          </button>
        )}
      </div>

      <VideoConference onClick={handleRedirect} />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      { source: Track.Source.Audio, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}