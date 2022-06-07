import "./App.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { UA, WebSocketInterface } from "jssip";
import { Box } from "@mui/system";
import axios from "axios";

function App() {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ua, setUa] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    let socket = new WebSocketInterface("");
    let configuration = {
      sockets: [socket],
      uri: "",
      password: "",
    };

    let ua = new UA(configuration);
    ua.on("connecting", () => {
      console.log("connection to server");
    });

    ua.on("connected", () => {
      console.log("connected to server");
    });

    ua.on("registered", () => {
      axios.get("http://localhost:5000/login").then(() => {
        console.log("Logged in");
      });
      console.log("Registered");
    });

    ua.on("disconnected", () => {
      console.log("disconnected");
    });

    ua.on("unregistered", () => {
      console.log("unregistered");
    });

    ua.on("newRTCSession", () => {
      console.log("newRTCSession");
    });

    setUa(ua);

    return () => {
      ua.stop();
    };
  }, []);

  const handleConnect = () => {
    console.log("Cicked");

    // Create our JsSIP instance and run it:

    ua.start();
    // Register callbacks to desired call events
    let eventHandlers = {
      progress: function (e) {
        console.log("call is in progress");
      },
      failed: function (e) {
        console.log("call failed with cause: " + e.data.cause);
      },
      ended: function (e) {
        console.log("call ended with cause: " + e.data.cause);
      },
      confirmed: function (e) {
        console.log("call confirmed");
      },
    };

    let options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: true },
    };

    // let session = ua.call("sip:bob@example.com", options);
  };

  const handleDisconnect = () => {
    ua.stop();
  };

  const handleCall = () => {
    const session = ua.call("3133-mobin.mirza%40evervent.in");
    session.on("peerconnection", (a) => {
      console.log("peerconnection");
      console.log({ a });
    });
    session.on("connecting", (a) => {
      console.log("connecting");
      console.log({ a });
    });
    session.on("sending", (a) => {
      console.log("sending");
      console.log({ a });
    });
    session.on("progress", (a) => {
      console.log("progress");
      console.log({ a });
    });
    session.on("accepted", (a) => {
      console.log("accepted");
      console.log({ a });
    });
    session.on("confirmed", (a) => {
      console.log("confirmed");
      console.log({ a });
    });
    session.on("ended", (a) => {
      console.log("ended");
      console.log({ a });
    });
    session.on("failed", (a) => {
      console.log("failed");
      console.log({ a });
    });
    session.on("newDTMF", (a) => {
      console.log("newDTMF");
      console.log({ a });
    });
    session.on("newInfo", (a) => {
      console.log("newInfo");
      console.log({ a });
    });
    session.on("hold", (a) => {
      console.log("hold");
      console.log({ a });
    });
    session.on("unhold", (a) => {
      console.log("unhold");
      console.log({ a });
    });
    session.on("muted", (a) => {
      console.log("muted");
      console.log({ a });
    });
    session.on("unmuted", (a) => {
      console.log("unmuted");
      console.log({ a });
    });
    session.on("reinvite", (a) => {
      console.log("reinvite");
      console.log({ a });
    });
    session.on("update", (a) => {
      console.log("update");
      console.log({ a });
    });
    session.on("refer", (a) => {
      console.log("refer");
      console.log({ a });
    });
    session.on("replaces", (a) => {
      console.log("replaces");
      console.log({ a });
    });
    session.on("sdp", (a) => {
      console.log("sdp");
      console.log({ a });
    });
    session.on("icecandidate", (a) => {
      console.log("icecandidate");
      console.log({ a });
    });
    session.on("getusermediafailed", (a) => {
      console.log("getusermediafailed");
      console.log({ a });
    });
    session.on("peerconnection:createofferfailed", (a) => {
      console.log("peerconnection:createofferfailed");
      console.log({ a });
    });
    session.on("peerconnection:createanswerfailed", (a) => {
      console.log("peerconnection:createanswerfailed");
      console.log({ a });
    });
    session.on("peerconnection:setlocaldescriptionfailed", (a) => {
      console.log("peerconnection:setlocaldescriptionfailed");
      console.log({ a });
    });
    session.on("peerconnection:setremotedescriptionfailed", (a) => {
      console.log("peerconnection:setremotedescriptionfailed");
      console.log({ a });
    });
    setSession(session);
  };

  const handleHoldCall = () => {
    console.log("holding");
    session.hold();
  };

  const handleDisconnectCall = () => {
    console.log("Disconnect call");
    session.terminate();
  };

  return (
    <div className="App">
      <Box>
        <Button onClick={handleConnect}>Connect</Button>
      </Box>
      <Box>
        <Button onClick={handleDisconnect}>Disconnect</Button>
      </Box>
      <Box>
        <Button onClick={handleCall}>Call</Button>
      </Box>
      <Box>
        <Button onClick={handleHoldCall}>Hold Call</Button>
      </Box>
      <Box>
        <Button onClick={handleDisconnectCall}>Disconnect Call</Button>
      </Box>
    </div>
  );
}

export default App;
