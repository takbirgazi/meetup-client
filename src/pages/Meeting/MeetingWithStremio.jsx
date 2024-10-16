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


const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0hhbl9Tb2xvIiwidXNlcl9pZCI6Ikhhbl9Tb2xvIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjkwODQ1NDMsImV4cCI6MTcyOTY4OTM0M30.w2UKhy3vuyWV_H_3oRZZ3p3W1onx2a9UMOGEk_lkv5I';
const userId = 'Han_Solo';
const callId = '0AgMWvdEfl5H';

const user = {
  id: userId,
  name: "Your Name",
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function Meeting() {
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
    return <div className='bg-[#111827] text-center text-gray-100 min-h-screen flex items-center justify-center'>Loading...</div>;
  }

  return (
    <div className='bg-[#111827] min-h-screen flex items-center justify-center'>
      <StreamTheme>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls />
      </StreamTheme>
    </div>
  );
};