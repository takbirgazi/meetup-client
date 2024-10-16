import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import useAuth from "../../hooks/useAuth";

const Meeting = () => {
    const params = useParams();
    const { user: participantName } = useAuth();
    const meetingId = params.id;

    const myMeeting = async (element) => {
        // generate Kit Token
        const appID = 576861095;
        const serverSecret = "45b9de5982738b2c06c0fb5a456a7445";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, meetingId, participantName?.uid, participantName?.displayName);

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: participantName?.displayName,
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference
            },
        });
    }

    return (
        <div>
            <div
                className="myCallContainer"
                ref={myMeeting}
                style={{ width: '100vw', height: '100vh' }}
            />
        </div>
    );
};

export default Meeting;