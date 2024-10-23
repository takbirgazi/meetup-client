import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Tldraw } from 'tldraw';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FaChalkboard } from 'react-icons/fa6';
import { TbChalkboardOff } from "react-icons/tb";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import 'tldraw/tldraw.css'
import { useSyncDemo } from '@tldraw/sync'
import { CounterShapeTool, CounterShapeUtil } from './CounterShape'
import { components, uiOverrides } from './ui'

const customShapes = [CounterShapeUtil]
const customTools = [CounterShapeTool]

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0hhbl9Tb2xvIiwidXNlcl9pZCI6Ikhhbl9Tb2xvIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjkwODQ1NDMsImV4cCI6MTcyOTY4OTM0M30.w2UKhy3vuyWV_H_3oRZZ3p3W1onx2a9UMOGEk_lkv5I';
const userId = 'Han_Solo';

export default function Meeting() {
  const { user: participant } = useAuth();
  const params = useParams();

  const [meetingId, setMeetingId] = useState(params.id);
  const [prtName, setPrtName] = useState(participant?.displayName);
  const [partImage, setPartImage] = useState(participant?.photoURL);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const user = {
    id: userId,
    name: prtName,
    image: partImage,
  };

  // Ref to avoid reinitializing StreamVideoClient and StreamCall
  const clientRef = useRef(null);
  const callRef = useRef(null);

  useEffect(() => {
    if (!clientRef.current) {
      clientRef.current = new StreamVideoClient({ apiKey, user, token });
    }

    if (!callRef.current) {
      callRef.current = clientRef.current.call('default', meetingId);
      callRef.current.join({ create: true });
    }

    // Update meeting ID and participant info when params change
    setMeetingId(params.id);
    setPrtName(participant?.displayName);
    setPartImage(participant?.photoURL);
  }, [params.id, participant]);

  const store = useSyncDemo({ roomId: meetingId, shapeUtils: customShapes })

  return (
    <div className='bg-gray-900 min-h-screen max-h-screen flex items-center justify-center'>
      <StreamVideo client={clientRef.current}>
        <StreamCall call={callRef.current}>

          <MyUILayout showWhiteboard={showWhiteboard} setShowWhiteboard={setShowWhiteboard} />
          
        </StreamCall>
      </StreamVideo>

      {/* Whiteboard is rendered separately to avoid affecting the meeting */}
      {showWhiteboard && (
        <div className={`relative tldraw__editor bg-slate-600 p-1 shadow-lg rounded-md z-50 ${isFullscreen ? 'w-full h-screen' : 'w-[500px] h-screen'}`}>
          <Tldraw
            forceMobile
            persistenceKey={meetingId}
            store={store}
            shapeUtils={customShapes}
            tools={customTools}
            overrides={uiOverrides}
            components={components}
            deepLinks
          />

          {/* Button to toggle fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-8 right-1 rounded-full text-inherit p-2 hover:bg-gray-700"
          >
            {isFullscreen ? <BiExitFullscreen size={24} /> : <BiFullscreen size={24} />}
          </button>
        </div>
      )}
    </div>
  );
}

export const MyUILayout = ({ showWhiteboard, setShowWhiteboard }) => {
  const navigate = useNavigate();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const leaveCall = async () => {
    await navigate("/room");
  };

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="bg-[#101827] flex flex-row justify-center items-center min-h-screen-100">
        <svg className="spinner-ring spinner-primary spinner-xl" viewBox="25 25 50 50" strokeWidth="5">
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>
    );
  }

  return (
    <StreamTheme className='relative bg-[#111827] min-h-screen h-auto mx-auto py-5 w-full text-gray-100'>
      <SpeakerLayout participantsBarPosition="bottom" participantsBarLimit="dynamic" />
      <CallControls onLeave={leaveCall} />

      {/* Button to Show Whiteboard */}
      <button
        onClick={() => setShowWhiteboard(!showWhiteboard)}
        className="absolute right-5 bottom-10 border hover:bg-gray-600 px-4 py-2 rounded mt-4"
      >
        {showWhiteboard ?
          <TbChalkboardOff title='Close Whitboard' size={24} />
          : <FaChalkboard title='Open Whiteboard' size={24} />
        }
      </button>
    </StreamTheme>
  );
};
