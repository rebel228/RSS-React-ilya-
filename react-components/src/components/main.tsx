import React, { Component } from 'react';
import ResultsSection from './result-section';
import SearchSection from './search-section';
import '../index.css';

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
      <div className="container">
        <header className="header">
          <h1>Beer academy</h1>
        </header>
        <main className="main">
          <h2>Beer catalogue</h2>

          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven,
            all organic, all delicious.
          </p>
        </main>
        <SearchSection onSearch={this.handleSearch} />
        <ResultsSection searchTerm={searchTerm} />
      </div>
    );
  }
}

export default Main;
