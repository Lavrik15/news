import React, { Component } from 'react';
import axios from 'axios';
import Table from '../Table/Table.js';
import Search from '../Search/Search.js';
import Button from '../Button/Button.js';
import Select from '../Select/select.js';
import {
  DEAFULT_QUERY,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  HITS_PER_PAGE,  
  url
} from '../constants/index.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchValue: DEAFULT_QUERY,
      error: null,
      sortKey: "NONE"
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.setTopSearchStories = this.setTopSearchStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSort = this.onSort.bind(this);
  }
  fetchSearchTopStories(searchValue, page = 0, hitsPerPage = 5) {
    axios({
      method: 'get',
      url: `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}&${PARAM_PAGE}${page}&${HITS_PER_PAGE}${hitsPerPage}`,
      timeout: 10000
    })
      .then(result => this.setTopSearchStories(result.data))
      .catch(error => this.setState({ error }))
  }
  onSort(sortKey) {
    this.setState({ sortKey });
  }
  onSearchSubmit(event) {
    const { searchValue, result } = this.state;
    const page = (result && result.page) || 0;
    const hitsPerPage = (result && result.hitsPerPage) || 5;

    this.setState({ result: null });

    this.fetchSearchTopStories(searchValue, page, hitsPerPage);

    event.preventDefault();
  }
  onSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }
  onSelectChange(event) {
    const { searchValue, result } = this.state;
    const page = (result && result.page) || 0;
    const hitsPerPage = event.target.value;
    this.fetchSearchTopStories(searchValue, page, hitsPerPage);
  }
  setTopSearchStories(result) {
    this.setState({ result })
  }
  componentDidMount() {
    const { searchValue, result } = this.state;
    const page = (result && result.page) || 0;
    const hitsPerPage = (result && result.hitsPerPage) || 5;
    this.fetchSearchTopStories(searchValue, page, hitsPerPage);
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
    const { result, searchValue, error, sortKey } = this.state;
    const page = (result && result.page) || 0;
    const hitsPerPage = (result && result.hitsPerPage) || 5;

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
          <Select
            onChange={this.onSelectChange}
          />
          {
            (error) ? <p>something went wrong</p>
              : (!result) ? <h1>loading</h1>
                : <Table
                  pattern={searchValue}
                  list={result.hits}
                  onDismiss={this.onDismiss}
                  onSort={this.onSort}
                  sortKey={sortKey}
                />
          }
          <Button
            onClick={() => this.fetchSearchTopStories(searchValue, page + 1, hitsPerPage)}
          >
            more
          </Button>
        </div>
      </div>
    );
  }
}

export default App;

export {
  Button,
  Search,
  Table
};
