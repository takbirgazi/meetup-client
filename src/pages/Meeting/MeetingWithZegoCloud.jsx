import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import cat from "../../assets/cat.png";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Room = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const { user: participantName } = useAuth();
  const meetingId = params.id;
  const [isHost, setIsHost] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const lastUserListRef = useRef(null);
  const updateTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axiosSecure(`/meeting/${meetingId}`);
        const meetingData = response.data;
        setParticipants(meetingData.participants || []);
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
  }, [meetingId, participantName?.email, axiosSecure]);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (error) {
      console.error("Permissions denied:", error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    const chatButton = document.getElementById("tidio-chat");
    if (chatButton) {
      chatButton.style.display = "none";
    }
  }, [isLoading]);

  // Enhanced function to update user avatars with retry mechanism
  const updateUserAvatars = async (userList, currentParticipants) => {
    if (!userList || !currentParticipants) return;

    const updatePromises = userList.map(async (user) => {
      const participant = currentParticipants.find(
        (p) => p.name === user.userName
      );

      if (participant) {
        try {
          await user.setUserAvatar(participant.photoURL || cat);
        } catch (error) {
          console.error(`Error setting avatar for ${user.userName}:`, error);
        }
      } else if (user.userName === participantName?.displayName) {
        try {
          await user.setUserAvatar(participantName?.photoURL || cat);
        } catch (error) {
          console.error("Error setting current user avatar:", error);
        }
      }
    });

    await Promise.all(updatePromises);
  };

  // Function to fetch and update participants
  const refreshParticipants = async () => {
    try {
      const response = await axiosSecure.get(`/meeting/${meetingId}`);
      const updatedParticipants = response.data.participants || [];
      setParticipants(updatedParticipants);

      if (lastUserListRef.current) {
        await updateUserAvatars(lastUserListRef.current, updatedParticipants);
      }
    } catch (error) {
      console.error("Error refreshing participants:", error);
    }
  };

  // Debounced refresh function to prevent too frequent updates
  const debouncedRefresh = () => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = setTimeout(refreshParticipants, 1000);
  };

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
    zpRef.current = zp;

    const meetingConfig = {
      container: element,
      onUserAvatarSetter: async (userList) => {
        lastUserListRef.current = userList;
        await updateUserAvatars(userList, participants);
      },
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
      onJoinRoom: async () => {
        try {
          // Update participant info
          await axiosSecure.patch(`/meeting/${meetingId}`, {
            name: participantName?.displayName,
            email: participantName?.email,
            photoURL: participantName?.photoURL || cat,
            role: "participant",
          });

          // Trigger refresh after joining
          await refreshParticipants();
        } catch (error) {
          console.error("Error joining room:", error);
        }
      },
      onUserJoin: async () => {
        // Trigger debounced refresh when a user joins
        debouncedRefresh();
      },
      onUserLeave: async () => {
        // Trigger debounced refresh when a user leaves
        debouncedRefresh();
      },
      showPreJoinView: true,
      showLeavingView: true,
      showUserList: true,
      showRoomDetailsButton: isHost,
      showRoomTimer: isHost,
      showPinButton: true,
      showRemoveUserButton: isHost,
      showMuteUserButton: isHost,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
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
        resolution: ZegoUIKitPrebuilt.ScreenSharingResolution_Auto,
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
      onUserListUpdate: async (userList) => {
        lastUserListRef.current = userList;
        if (userList.length > 2) {
          zpRef.current?.setLayoutMode(ZegoUIKitPrebuilt.LayoutMode.Tiled);
        } else {
          zpRef.current?.setLayoutMode(ZegoUIKitPrebuilt.LayoutMode.Spotlight);
        }
        // Update avatars whenever user list changes
        await refreshParticipants();
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

  // Cleanup function for the update timeout
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Effect to update avatars when participants list changes
  useEffect(() => {
    if (lastUserListRef.current && participants.length > 0) {
      updateUserAvatars(lastUserListRef.current, participants);
    }
  }, [participants]);

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

export default Room;