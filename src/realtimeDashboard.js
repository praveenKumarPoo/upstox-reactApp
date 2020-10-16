import React from "react";
import styled from 'styled-components';
import ChartJS from "./chart";
import axios from 'axios';

const WrapperDiv = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    div.react-stockchart{
        background: #C2D39C;
    }
    svg{
        right:0;
    }
    @media screen and (max-width: 1080px){
        zoom: 1.1;
    }
    @media screen and (max-width: 768px){
        svg{
           zoom: 0.5;
           left: 0px;
        }
        transform: translateY(-250px);
        div.react-stockchart{
            width: 320px !important;
            height: 199px !important;
        }
    }
 .btnContainer{
    /* width: 720px; */
    margin: auto;
 }
 button{
    padding: 0.4rem;
    margin: 0.5rem;
    font-size: 10pt;
    font-weight: bold;
 }
 `
let ws;
export class RealTimeDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: []
        }
    }
    componentDidMount() {
        this.websocketConnection();
    };
    componentWillUnmount(){
        ws && ws.send(JSON.stringify({ cmd: 'unsub', data: { state: false } }))
    }
    websocketConnection() {
        const sendBtn = document.querySelector('#send');
        const messages = document.querySelector('#messages');
        const showMessage = (message) => {
            messages.textContent += `\n\n${message}`;
            messages.scrollTop = messages.scrollHeight;
        }
        const init = () => {
            if (ws) {
                ws.onerror = ws.onopen = ws.onclose = null;
                ws.close();
            }
            ws = new WebSocket('wss://node-websocket-connect.herokuapp.com/watch');
            ws.onopen = () => {
                console.log('Connection opened!');
            }
            let chartData = [];
            ws.onmessage = ({ data }) => {
                const singleData = data.split(",")
                if (singleData.length > 1) {
                    chartData.push({
                        date: new Date(parseInt(singleData[0])),
                        open: singleData[1],
                        high: singleData[2],
                        low: singleData[3],
                        close: singleData[4],
                        volume: singleData[5],
                    });
                    this.setState({ chartData: chartData });
                }
                showMessage(data);
                console.log(data);
            }

            ws.onclose = function () {
                ws = null;
            }

        }
        sendBtn.onclick = function () {
            if (!ws) {
                showMessage("No WebSocket connected may be websocket stoped please restart");
                init();
                return;
            }
            ws && ws.send(JSON.stringify({ cmd: 'sub', data: {} }));
        }
        init();
    }
    render() {
        return (
            <WrapperDiv>
                <div>  {this.state.chartData.length > 10 && <ChartJS width={720} key={1} data={this.state.chartData} />}</div>
                <div className={"btnContainer"}>

                    <h5>Real Time Messaging</h5>
                    <pre id="messages" style={{ height: "40px", overflow: "scroll" }}></pre>
                    <button id="send" title="start Subscribe!">start Subscribe!</button>
                    <button title="stop Subscribe!" onClick={() => {
                        ws && ws.send(JSON.stringify({ cmd: 'unsub', data: { state: false } }))
                    }}>stop Subscribe!</button>
                    <button title="stop Subscribe!" onClick={() => {
                        ws && ws.send(JSON.stringify({ cmd: 'ping', data: { state: false } }))
                    }}>ping</button>
                </div>
            </WrapperDiv>
        );
    }
}
export default RealTimeDashboard;