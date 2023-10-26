import { Component } from 'react';

export interface Beer {
  id: number;
  name: string;
  description: string;
}

export interface ResultsSectionProps {
  searchTerm: string;
}

export interface ResultsSectionState {
  searchResults: Beer[];
  isLoading: boolean;
}

class ResultsSection extends Component<ResultsSectionProps, ResultsSectionState> {
  constructor(props: ResultsSectionProps) {
    super(props);
    this.state = {
      searchResults: [],
      isLoading: true,
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
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ searchResults: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  render() {
    const { searchResults, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          searchResults.map((result) => (
            <div key={result.id}>
              <h3>{result.name}</h3>
              <p>{result.description}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default ResultsSection;
