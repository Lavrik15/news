import React, { Component } from 'react';
import Table from '../Table/Table.js';
import Search from '../Search/Search.js';
import './App.css';


const list = [
  {
    title: "react",
    url: "https://reactjs.org/",
    author: "Petr",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "react",
    url: "https://reactjs.org/",
    author: "Ivan",
    num_comments: 1,
    points: 2,
    objectID: 1
  }
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchValue: "react"
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onSearchChange(event) {
    this.setState({ searchValue: event.target.value });
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const listUpdate = this.state.list.filter(isNotId);
    this.setState({ list: listUpdate });
  }
  render() {
    const { list, searchValue } = this.state;
    return (
      <div className="App">
        <div className="App-inner">
          <Search
            onSearchChange={this.onSearchChange}
            searchValue={searchValue}
          >
        </Search>
          <Table
            pattern={searchValue}
            list={list}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

export default App;
