import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import "./table.css";
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';
const getDescription = (value, row) =>{
    return <>
        <span>{value}</span>
        <span>{`(${row.url}) by ${row.author}`}</span>
        <span>{`[hide]`}</span>
    </>
}
const columns = [
  { width: 100,key: "num_comments", name: "Comments"},
  { width: 100,key: "points", name: "Votes Counts" },
  { key: "title", name: "News Details", "formatter": ({value,row}) => getDescription(value,row)}
];

const rows = [
  { num_comments: 0, title: "Task 1", points: 20 },
  { num_comments: 1, title: "Task 2", points: 40 },
  { num_comments: 2, title: "Task 3", points: 60 }
];

export class TableData extends React.Component {
  state = { rows };
  componentDidMount(){
      fetch("https://hn.algolia.com/api/v1/search").then(response => response.json())
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
    const data = [
        {							
            color: "steelblue", 
            points: this.state.rows.map(({points, num_comments})=>({
                x: points? points: 0,
                y: num_comments ? num_comments : 0
            }))
        }
    ];
    return (
        <div>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => this.state.rows[i]}
                rowsCount={this.state.rows.length}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
            />
            <LineChart
                width={600}
                height={400}
                data={data}
                ticks={20}
                xLabel = {"ID"}
                yLabel = {"Votes"}
            />
        </div>
    );
  }
}
export default TableData;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Example />, rootElement);
