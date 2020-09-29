import React, { useEffect, useState, useRef } from "react";
import audioFile from "./audio.mp3";

function App() {
  const [devices, setDevices] = useState([]);
  const audio = useRef();

  useEffect(() => {
    getMediaDevices();
  }, []);

  useEffect(() => {
    console.log(devices);
  }, [devices]);

  function getMediaDevices() {
    try {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          navigator.mediaDevices
            .enumerateDevices()
            .then(setDevices)
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (_) {}
  }

  function handleOnChnage(event) {
    audio.current.setSinkId(event.target.value);
  }

  return (
    <div className="App">
      <audio src={audioFile} controls ref={audio} loop />
      <select onChange={handleOnChnage}>
        {devices
          .filter((device) => device.kind === "audiooutput")
          .map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default App;
