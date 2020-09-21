import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import styled from 'styled-components';
import "./table.css";
import LineChart from 'react-linechart';
import { Line } from 'react-chartjs-2';
import Peer from 'simple-peer';
import axios from 'axios';
import '../node_modules/react-linechart/dist/styles.css';


const VideoController = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    background-color: gray;
    width: 70vw;
    & video{
        min-width: 30vw;
        max-width: 40vw;
        min-height: 30vh;
        max-height: 40vh;
    }
 `
 const WrapperDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    background-color: gray;
    height: 100vh;
    .messageContainer{
       color:white;
       width: 25vw;
    }
 `

export class TableData extends React.Component {
    componentDidMount() {
        this.websocketConnection();
        window.navigator.webkitGetUserMedia({
            video: true,
            audio: true
        }, function (stream) {
            var peer1 = new Peer({
                initiator: window.location.hash === '#1',
                trickle: false,
                stream,
            }) // you don't need streams here
            var peer2 = new Peer()
            axios.defaults.headers.common["Content-Type"] = "application/json";

            peer1.on('signal', data => {
                if (!data.renegotiate) {
                    axios.post('https://webrtcconnectinfo.herokuapp.com/add', { [(window.location.hash === '#1' ? "admin" : "user")]: data })
                        .then(function (response) {
                            console.log(response);
                        }).catch((e) => alert(e))
                }
                console.log(JSON.stringify(data))
            });
            peer1.on('connect', data => {
                alert(data)
            });
            // https://webrtcconnectinfo.herokuapp.com/get
            if (window.location.hash != '#1') {
                axios.post('https://webrtcconnectinfo.herokuapp.com/get').then(function (data2) {
                    const adminList = data2.data.filter((x)=>x.admin)
                    peer1.signal(adminList[0].admin);
                })
            } else {
                const getuserID = window.setInterval(function () {
                    axios.post('https://webrtcconnectinfo.herokuapp.com/get').then(function (data2) {
                        const userList = data2.data.filter((x)=>x.user)
                        if (userList.length) {
                            peer1.signal(userList[0].user);
                            window.clearInterval(getuserID);
                        }
                    })
                }, 2000)
            }

            peer1.on('stream', stream => {
                // got remote video stream, now let's show it in a video tag
                var video = document.querySelectorAll(".video");
                for (var i = 0; i < video.length; i++) {
                    if ('srcObject' in video[i]) {
                        video[i].srcObject = stream
                    } else {
                        video[i].src = window.URL.createObjectURL(stream) // for older browsers
                    }
    
                    video[i].play()
                  }
            })
        }, function (err) { console.log(err) });
        
    };
    websocketConnection (){
        const sendBtn = document.querySelector('#send');
        const messages = document.querySelector('#messages');
        const messageBox = document.querySelector('#messageBox');
    
        let ws;
    
        const  showMessage = (message) => {
          messages.textContent += `\n\n${message}`;
          messages.scrollTop = messages.scrollHeight;
          messageBox.value = '';
        }
    
        const init = () => {
          if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
          }
          ws = new WebSocket('wss://node-websocket-connect.herokuapp.com');
          ws.onopen = () => {
            console.log('Connection opened!');
          }
          ws.onmessage = ({ data }) => showMessage(data);
          ws.onclose = function() {
            ws = null;
          }
        }
    
        sendBtn.onclick = function() {
          if (!ws) {
            showMessage("No WebSocket connection :(");
            return ;
          }
    
          ws.send(messageBox.value);
          showMessage(messageBox.value);
        }
    
        init();
    
    }
    render() {
        return (
            <WrapperDiv>
                <VideoController>
                    <video className={"video"} id="video" controls muted/>
                    <video className={"video"} id="video1" controls muted/>
                    <video className={"video"} id="video2" controls muted/>
                    <video className={"video"} id="video3" controls muted/>
                </VideoController>
                <div class={"messageContainer"}>
                    <h1>Real Time Messaging</h1>
                    <pre id="messages" style={{ height: "100px", overflow: "scroll" }}></pre>
                    <input type="text" id="messageBox" placeholder="Type your message here" style={{ display: "block", width: "100%", marginBottom: "10px", padding: "10px" }} />
                    <button id="send" title="Send Message!" style={{ width: "100%", height: "30px" }}>Send Message</button>
                </div>
            </WrapperDiv>
        );
    }
}
export default TableData;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Example />, rootElement);
