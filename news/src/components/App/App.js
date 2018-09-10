import React, { Component } from 'react';
import Table from '../Table/Table.js';
import Search from '../Search/Search.js';
import './App.css';

const DEAFULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PARAM_SEARCH}?${PARAM_SEARCH}${DEAFULT_QUERY}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchValue: DEAFULT_QUERY
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setTopSearchStories = this.setTopSearchStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  fetchSearchTopStories(searchValue) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}`)
    .then(response => response.json())
    .then(result => this.setTopSearchStories(result))
    .catch(error => error);
  }
  onSearchSubmit(event) {
    const {searchValue} = this.setState;
    this.fetchSearchTopStories(searchValue);
    event.preventDefault();
  }
  onSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }
  setTopSearchStories(result) {
    this.setState({ result })
  }
  componentDidMount() {
    const { searchValue } = this.state;
    this.fetchSearchTopStories(searchValue);
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const listUpdate = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: listUpdate }
    });
  }
  render() {
    console.log(this.state);
    const { result, searchValue } = this.state;
    return (
      <div className="App">
        <div className="App-inner">
          <Search
            onSearchChange={this.onSearchChange}
            value={searchValue}
            onSubmit={this.onSearchSubmit}
          >
          search
          </Search>
          {(!result) ? <h1>loading</h1> :
            <Table
              pattern={searchValue}
              list={result.hits}
              onDismiss={this.onDismiss}
            />}
        </div>
      </div>
    );
  }
}

export default App;
