import React, { Component } from 'react';
import ResultsSection from './result-section';
import SearchSection from './search-section';

class Main extends Component {
  state = {
    searchTerm: '',
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
  };

  componentDidMount(): void {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      this.setState({ searchTerm });
    }
  }
  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <SearchSection onSearch={this.handleSearch} />
        <ResultsSection searchTerm={searchTerm} />
      </div>
    );
  }
}

export default Main;
