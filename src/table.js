import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import "./table.css";

const columns = [
  { key: "num_comments", name: "Comments"},
  { key: "points", name: "Votes Counts" },
  { key: "title", name: "News Details"}
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
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.state.rows[i]}
        rowsCount={this.state.rows.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
      />
    );
  }
}
export default TableData;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Example />, rootElement);
