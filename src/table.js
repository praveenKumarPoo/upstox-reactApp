import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import styled from 'styled-components';
import "./table.css";
import LineChart from 'react-linechart';
import { Line } from 'react-chartjs-2';
import '../node_modules/react-linechart/dist/styles.css';

const PageControll = styled.div`
    float: right;
    padding: 10px;
    font-size: 1em;
    font-weight: 600;
    color: #fb8e06;
    border: 1px solid;
    width: 98%;
    text-align: right;
    z-index: 1000;
    position: absolute;
    cursor: pointer;
 `
const StyledGrid = styled.div`
	position: relative;
	flex: 1; width: 100%;

	.react-grid-Main, .react-grid-Grid, .react-grid-Header, .react-grid-Canvas {
		/* RESET */
		border: none; outline-color: 000000; outline-color: red;
        font-size: 12px; font-size: var(--font-2); /* 1.01vmax*/ 
    }

		@media (max-width: 543.98px) { font-size: 14px; }
		@media (max-height: 543.98px)  and (orientation: portrait){ font-size: 14px; }
	}

	/* empty table background*/
	.react-grid-Canvas {
		background-color: #474747; background-color: var(--color-layout-4);

		/*empty table horizontal scroll*/
		&>div { min-height: 1px; }
	}

	.react-grid-HeaderRow {
        height: 100px;
		/*child2 = filter row styles*/
			.react-grid-HeaderCell {
                padding: 10px;
                background-color: #fb8e06;
                color: #ffffff;
                font-size: 0.8em;
                word-wrap: break-word;
				&>div {
					width: 100%; max-width: 100%;
					height: 100%;
				}
			}
    }
    .vote-link{
        color: blue;
    }
    .upVoteWrapper{
        margin-left: 40px;
    }
    .upVote {
        width: 0; 
        height: 0; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid black;
        cursor: pointer;
    }
    .react-grid-Cell{
        font-size: 0.9em;
        font-weight: 600;
    }
	.react-grid-Row--odd {
        .react-grid-Cell{
            background-color: lightgray;
            font-size: 0.9em;
            font-weight: 600;
        }
		background-color: #474747; background-color: var(--color-layout-4);
		
		:hover {
			background-color: #474747; background-color: var(--color-layout-4);

			.react-grid-Cell {
				background-color: #666666; background-color: var(--color-layout-6);
			}
		}
	}
`
export const Table = (props) => (
    <StyledGrid>
        {props.children}
    </StyledGrid>
);
const StyledGraph = styled.div`
    margin-top: 50px;
    width: 100%`

const LineChartContainer = (props) => (
    <StyledGraph>
        {props.children}
    </StyledGraph>
);
const landingOptions = {
    scaleShowLabels: false,
    legend: {
        display: true,
        scaleShowLabels: true,
    },
    scales: {
        xAxes: [
            {
                // type: 'linear',
                id: "landingX",
                display: true,
                gridLines: {
                    color: "#9E9E9E",
                    display: false
                },
                barThickness: 5,
                maxBarThickness: 8,
                barPercentage: 1,
                categoryPercentage: 1,
                ticks: {
                    source: "data",
                    autoSkip: true,
                    distribution: "linear",
                    maxRotation: 70,
                    maxTicksLimit: 30
                },
            }
        ],
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'landingY',
                gridLines: {
                    display: true,
                    color: "gray",
                    lineWidth: 0.5,
                    zeroLineWidth: 0
                },
                ticks: {
                    source: "data",
                    autoSkip: true,
                    distribution: "linear",
                    maxRotation: 70,
                    maxTicksLimit: 30
                }
            }
        ]
    }
}
export class TableData extends React.Component {
  state = { rows: [], pageNo: 0 };
  loadDatafromServer(pageNo){
    fetch(`https://hn.algolia.com/api/v1/search?page=${pageNo}`).then(response => response.json())
    .then(data => 
      this.setState({rows: data.hits, pageNo}))
  }
  getDescription = (value, row) =>{
    return <>
        <span>{value}</span>
        <span className="vote-link">{`(${row.url})`} </span>
        <span>{`by ${row.author}`}</span>
        <span onClick={()=>{
            const existingHiddenRow = localStorage.getItem("hiddenRecords") ? JSON.parse(localStorage.getItem("hiddenRecords")).hiddenRows : [];
            const newHiddenArray = [...new Set([...existingHiddenRow,row.points])];
            localStorage.setItem("hiddenRecords",JSON.stringify({"hiddenRows":newHiddenArray}))
            let newShowList = this.state.rows.filter(x=>newHiddenArray.indexOf(x.points)==-1);
            this.setState({rows: newShowList});
            alert(localStorage.getItem("hiddenRecords"));
        }}>{`[hide]`}</span>
    </>
}
getVoteCount(value){
    return <p><span>{`${value}`}</span></p>
}
getUpVote(value, row){
    return <div className="upVoteWrapper"><div className="upVote" onClick={()=>{
        let mynewList = [...this.state.rows].map((obj)=>{
            const {points} = obj;
            if(row.objectID==obj.objectID)obj.points = points+1;
            return obj;
        });
        this.setState({rows: mynewList});
    }}></div></div>
}
columns = [
  { width: 100,key: "num_comments", name: "Comments"},
  { width: 100,key: "points", name: "Votes Counts", "formatter": ({value,row}) =>this.getVoteCount(value) },
  { width: 100,key: "points", name: "Up Votes", "formatter": ({value,row}) =>this.getUpVote(value,row) },
  { key: "title", name: "News Details", "formatter": ({value,row}) => this.getDescription(value,row)}
];
  componentDidMount(){
      fetch(`https://hn.algolia.com/api/v1/search`).then(response => response.json())
      .then(data => 
        this.setState({rows: data.hits}))
  }
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
      const { pageNo }  = this.state ;
    // const data = [
    //     {							
    //         color: "steelblue", 
    //         points: this.state.rows.map(({points, objectID})=>{
    //             return ({
    //             y: points? points: 0,
    //             x: objectID ? objectID : 0
    //         })})
    //     }
    // ];
    const voteDataset = {
        labels: this.state.rows.map(({objectID})=>objectID),
        datasets: [
          {
			type:'line',
            label: 'Vote Count',
			// backgroundColor: "#4442d2",
			borderColor: "#4442d2",
            data: this.state.rows.map(({points})=>points),
          }
        ]
	  };
    return (
        <div>
            <Table>
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={this.state.rows.length}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    enableCellSelect={true}
                />
            </Table>
            <PageControll>
                <span onClick={()=>{
                    let pageno = pageNo ? pageNo - 1 : 0;
                    this.loadDatafromServer(pageno)
                }} >Previous|</span>
                <span  onClick={()=>{
                    let pageno = pageNo + 1;
                    this.loadDatafromServer(pageno)
                }}>next</span>
            </PageControll>
            {/* <LineChart
                width={1080}
                height={300}
                data={data}
                ticks={20}
                xLabel = {"ID"}
                yLabel = {"Votes"}
                interpolate={"cardinal"}
                pointRadius={3}
                onPointHover={(points)=>`Votes: ${points.y} ID: ${points.x}`}
            /> */}
            <LineChartContainer>
                <Line
                    id="alarm_landing"
                    data={voteDataset}
                    options={landingOptions}
                />
            </LineChartContainer>
        </div>
    );
  }
}
export default TableData;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Example />, rootElement);
