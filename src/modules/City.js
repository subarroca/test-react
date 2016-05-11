import React from 'react';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'City';
  }
  render() {
    return <div>
 	    <h2>City {this.props.params.id}</h2>
 	  </div>;
  }
}

export default City;
