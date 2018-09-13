import React, { Component } from 'react';
import axios from 'axios';
import Table from '../Table/Table.js';
import Search from '../Search/Search.js';
import Button from '../Button/Button.js';
import Select from '../Select/select.js';
import './App.css';

const DEAFULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const HITS_PER_PAGE = 'hitsPerPage=';
const url = `${PATH_BASE}${PARAM_SEARCH}?${PARAM_SEARCH}${DEAFULT_QUERY}&${PARAM_PAGE}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchValue: DEAFULT_QUERY,
      error: null
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.setTopSearchStories = this.setTopSearchStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
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
  onSearchSubmit(event) {
    const { searchValue, result } = this.state;
    const page = (result && result.page) || 0;
    const hitsPerPage = (result && result.hitsPerPage) || 5;

    this.setState({result: null});
    
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
    const { result, searchValue, error } = this.state;
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
