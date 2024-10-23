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
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0hhbl9Tb2xvIiwidXNlcl9pZCI6Ikhhbl9Tb2xvIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjkwODQ1NDMsImV4cCI6MTcyOTY4OTM0M30.w2UKhy3vuyWV_H_3oRZZ3p3W1onx2a9UMOGEk_lkv5I';
const userId = 'Han_Solo';

export default function Meeting() {
  const { user: participant } = useAuth();
  const params = useParams();
  
  const [meetingId, setMeetingId] = useState(params.id);
  const [prtName, setPrtName] = useState(participant?.displayName);
  const [partImage, setPartImage] = useState(participant?.photoURL);

  const user = {
    id: userId,
    name: prtName,
    image: partImage,
  };

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call('default', meetingId);

  useEffect(() => {
    call.join({ create: true });
  }, [call]);

  useEffect(() => {
    setMeetingId(params.id);
    setPrtName(participant?.displayName);
    setPartImage(participant?.photoURL);
  }, [params.id, participant]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="bg-[#101827] flex flex-row justify-center items-center h-screen">
        <svg className="spinner-ring spinner-primary spinner-xl" viewBox="25 25 50 50" strokeWidth="5">
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>
    );
  }

  return (
    <StreamTheme className='bg-[#111827] min-h-screen h-auto mx-auto py-5'>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};