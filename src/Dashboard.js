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
        background: #F7F0A1;
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
            background: #F7F0A1;
            width: 320px !important;
            height: 199px !important;
        }
    }
 `
let ws;
export class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: []
        }
    }
    getServerData = () => axios.get("http://kaboom.rksv.net/api/historical?interval=9").catch(function (error) {
        const chartPoints = localStorage.getItem("chartPoints") ? JSON.stringify(localStorage.getItem("chartPoints")):[];
        this.setState({ chartData: chartPoints });
            console.log(error);
        });
    componentDidMount() {
        const asyncDatafetch = async () =>{
            const chartData = await this.getServerData();
            let response = [...chartData.data.reverse()];
            const chartPoints = response ? response.map((data)=>{
                const singleData = data.split(",");
                return {
                    date: new Date(parseInt(singleData[0])),
                    open: singleData[1],
                    high: singleData[2],
                    low: singleData[3],
                    close: singleData[4],
                    volume: singleData[5],
                }
            }): [];
            localStorage.setItem("chartPoints", JSON.stringify(chartPoints));
            this.setState({ chartData: chartPoints });
        }
        asyncDatafetch();
    };
    render() {
        return (
            <WrapperDiv>
                <div>  {this.state.chartData.length > 10 && <ChartJS width={720} key={1} data={this.state.chartData} />}</div>
            </WrapperDiv>
        );
    }
}
export default Dashboard;