import React, { Component, createRef } from 'react';

export interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
}

class SearchSection extends Component<SearchSectionProps> {
  private inputRef = createRef<HTMLInputElement>();

  handleSearch = () => {
    const inputValue = this.inputRef.current?.value || '';
    this.props.onSearch(inputValue);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.inputRef}
          defaultValue={localStorage.getItem('searchTerm') || ''}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchSection;
