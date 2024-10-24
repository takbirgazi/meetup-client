import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"; // Make sure to import the necessary constants
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Meeting = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const { user: participantName } = useAuth();
  const meetingId = params.id;
  const [isHost, setIsHost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axiosSecure(`/meeting/${meetingId}`);
        const meetingData = response.data;

        setIsHost(meetingData.hostEmail === participantName?.email);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching meeting details:", error);
        setIsLoading(false);
      }
    };

    if (meetingId && participantName?.email) {
      fetchMeetingDetails();
    }
  }, [meetingId, participantName?.email]);

  // Request camera and microphone permissions
  async function requestPermissions() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (error) {
      console.error("Permissions denied:", error);
    }
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    return () => {
      // Remove the Tidio chat widget
      const chatWidget = document.querySelector('#tidio-chat');
      console.log(chatWidget);
      if (chatWidget) {
        chatWidget.remove();
      }
    };
  }, []);

  const myMeeting = async (element) => {
    const appID = 576861095;
    const serverSecret = "45b9de5982738b2c06c0fb5a456a7445";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      meetingId,
      participantName?.uid,
      participantName?.displayName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    const meetingConfig = {
      container: element,
      sharedLinks: [
        {
          name: participantName?.displayName,
          url: window.location.protocol + "//" + window.location.host + window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // Use the constant for scenario mode
      },
      onLeaveRoom: () => {
        navigate("/room");
      },
      onJoinRoom: () => {
        console.log("Joined room");
      },
      showPreJoinView: true,
      showLeavingView: true,
      showUserList: true,
      showRoomDetailsButton: isHost,
      showRoomTimer: isHost,
      showPinButton: true,
      showRemoveUserButton: isHost,
      showMuteUserButton: isHost,
      turnOnMicrophoneWhenJoining: isHost,
      turnOnCameraWhenJoining: isHost,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showLayoutButton: true,
      showScreenSharingButton: true,
      showHostEndMeetingButton: isHost,
      recordingEnabled: isHost,
      hostControl: isHost
        ? {
          muteAll: true,
          lockRoom: true,
          endRoom: true,
        }
        : {},
      screenSharingConfig: {
        resolution: ZegoUIKitPrebuilt.ScreenSharingResolution_Auto, // Set the resolution you want
      },
      videoResolutionList: [
        ZegoUIKitPrebuilt.VideoResolution_360P,
        ZegoUIKitPrebuilt.VideoResolution_180P,
        ZegoUIKitPrebuilt.VideoResolution_480P,
        ZegoUIKitPrebuilt.VideoResolution_720P,
      ],
      videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_720P,
      onRoomStateUpdate: (state) => {
        if (state === "DISCONNECTED") {
          console.log("Disconnected, trying to reconnect...");
        }
      },
      onUserListUpdate: (userList) => {
        if (userList.length > 2) {
          zp.setLayoutMode(ZegoUIKitPrebuilt.LayoutMode.Tiled);
        } else {
          zp.setLayoutMode(ZegoUIKitPrebuilt.LayoutMode.Spotlight);
        }
      },
      onCameraStateUpdate: (cameraState) => {
        if (!cameraState.isOpen) {
          console.error("Camera permission issue detected.");
        }
      },
      showTextChat: true,
      autoHideFooter: true,
    };

    zp.joinRoom(meetingConfig);
    zp.addPlugins({ ZegoSuperBoardManager });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="myCallContainer"
      ref={(el) => {
        if (el) {
          myMeeting(el);
        }
      }}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default Meeting;
