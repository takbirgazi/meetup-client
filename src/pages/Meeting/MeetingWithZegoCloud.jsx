import { ZegoUIKitPrebuilt, ScenarioModel, ScreenSharingResolution } from "@zegocloud/zego-uikit-prebuilt"; // Make sure to import the necessary constants
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
      maxUsersToShowVideo: 6,
    };
    // interactive whiteboard

    zp.joinRoom(meetingConfig);
    zp.addPlugins({ ZegoSuperBoardManager });
    // Join the room with the configured options
    zp.on('videoStatusUpdate', (userID, videoState) => {
      if (videoState === 'stopped') {
        zp.startPlaying(userID); // Attempt to restart the video
      }
    });
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
