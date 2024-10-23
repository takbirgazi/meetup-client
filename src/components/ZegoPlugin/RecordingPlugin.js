// RecordingPlugin.js

class RecordingPlugin {
  constructor() {
    this.isRecording = false;
    this.recordingStream = null;
    this.mediaRecorder = null;
    this.recordedChunks = [];
  }

  async startRecording() {
    if (this.isRecording) return;

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    this.recordingStream = stream;
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = this.handleStopRecording.bind(this);
    this.mediaRecorder.start();
    this.isRecording = true;
  }

  stopRecording() {
    if (!this.isRecording) return;

    this.mediaRecorder.stop();
    this.recordingStream.getTracks().forEach((track) => track.stop());
    this.isRecording = false;
  }

  handleStopRecording() {
    const blob = new Blob(this.recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "record.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

export default RecordingPlugin;
