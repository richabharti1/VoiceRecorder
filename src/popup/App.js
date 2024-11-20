import {Box, Button} from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import {useState} from 'react';


export const App = () => {
    const [recording, setRecording] = useState(false);
    const [playButtonDisabled,setPlayButtonDisabled] = useState(true);

    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    let audioUrl;

    const startRecording= async()=> {
        try {
            // Request access to the microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioUrl = URL.createObjectURL(audioBlob);
            };

            mediaRecorder.start();

        } catch (err) {
            console.error('Error accessing microphone: ', err);
            alert('Unable to access your microphone. Please make sure your device has a working microphone.');
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
    }


    const handRecording = () => {
        if(recording === false){
            startRecording();
        }
        else{
            stopRecording();
            setPlayButtonDisabled(false);
        }
        setRecording(!startRecording);
    };
    return (
        <Box sx={{width: '150px'}}>
            <Button sx={{marginBottom:'10px',width:'130px'}} variant="contained" onClick={() => handRecording()}>Recording
                <div style={{background:'red',marginLeft:'10px', height:'25px'}}>{recording ? <StopCircleIcon/> : <PlayCircleFilledIcon/>}</div>
            </Button>
            <Button variant="contained" sx={{width:'130px',}} disabled={playButtonDisabled}>Play Button</Button>
        </Box>
    );
};
