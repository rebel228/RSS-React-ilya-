import { Component } from 'react';

import '../index.css';
import Spinner from './spinner';

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
}

export interface ResultsSectionProps {
  searchTerm: string;
}

export interface ResultsSectionState {
  searchResults: Beer[];
  isLoading: boolean;
  hasError: boolean;
}

class ResultsSection extends Component<ResultsSectionProps, ResultsSectionState> {
  constructor(props: ResultsSectionProps) {
    super(props);
    this.state = {
      searchResults: [],
      isLoading: true,
      hasError: false,
    };
  }

  componentDidMount() {
    this.fetchSearchResults();
  }
  componentDidUpdate(prevProps: ResultsSectionProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.fetchSearchResults();
    }
  }

  fetchSearchResults = async () => {
    const { searchTerm } = this.props;
    let url = 'https://api.punkapi.com/v2/beers';
    if (searchTerm && searchTerm.trim() !== '') {
      url += `?beer_name=${encodeURIComponent(searchTerm.trim())}`;
    }

    try {
      this.setState({ isLoading: true });
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ searchResults: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching search results:', error);
      this.setState({ searchResults: [], isLoading: false, hasError: true });
    }
  };

  render() {
    const { searchResults, isLoading } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    if (!Array.isArray(searchResults)) {
      return <p>No search results found.</p>;
    }
    return (
      <ul className="beer-list">
        {searchResults.map((beer) => (
          <li
            className="beer-card"
            key={beer.id}
          >
            <img
              src={beer.image_url}
              alt={beer.name}
            />
            <div>
              <h3>{beer.name}</h3>
              <h4>{beer.tagline}</h4>
              <p>{beer.description}</p>
              <span>abv: {beer.abv}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default ResultsSection;
