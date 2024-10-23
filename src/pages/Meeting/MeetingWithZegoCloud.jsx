import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
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
        // Fetch meeting details from the server using axiosSecure
        const response = await axiosSecure(`/meeting/${meetingId}`);
        const meetingData = response.data;
        console.log("Meeting details:", meetingData);

        // Check if current user's email matches the host's email
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

  const myMeeting = async (element) => {
    // generate Kit Token
    const appID = 576861095;
    const serverSecret = "45b9de5982738b2c06c0fb5a456a7445";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      meetingId,
      participantName?.uid,
      participantName?.displayName
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Configure meeting options based on host status
    const meetingConfig = {
      container: element,
      sharedLinks: [
        {
          name: participantName?.displayName,
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
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
    };
    // interactive whiteboard

    zp.joinRoom(meetingConfig);
    zp.addPlugins({ ZegoSuperBoardManager });
    // Join the room with the configured options
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
