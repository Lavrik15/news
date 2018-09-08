import React, { Component } from 'react';
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
  },
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchValue: "",
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onSearchChange(event) {
    this.setState({searchValue: event.target.value});
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const listUpdate = this.state.list.filter(isNotId);
    this.setState({list: listUpdate});
  }
  render() {
    return (
      <div className="App">
          <form>
            <input
              type="text"
              onChange={this.onSearchChange}
            />    
          </form>
        {this.state.list.map(item => {
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  удалить
                </button>
              </span>
                
            </div>
          );
        })}
        <h1>{this.state.searchValue}</h1>
      </div>
    );
  }
}

export default App;
