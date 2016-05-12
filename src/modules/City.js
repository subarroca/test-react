import React from 'react'
import $ from 'jquery'


class City extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      location: [],
      info: []
    }
  }

  componentDidMount() {  
    $.ajax({
      url: `http://api.idescat.cat/emex/v1/geo/${this.props.params.id}.json`,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.handleResults(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }

  handleResults(data) {
    var fitxes = data.fitxes;

    this.setState({
      location: fitxes.cols.col.map((info) => {
        return info.content;
      }),
      info: fitxes.gg.g
    })
  }

  render() {
    var locations = [];
    var infos = [];

    this.state.location.forEach(function(location){
      locations.push(
        <li key={location}>{location}</li>
      )
    }.bind(this));

    this.state.info.forEach(function(info){
      infos.push(
        <li key={info.id}>
          <strong>{info.c}</strong>&nbsp;
          <span>{info.id}</span>
        </li>
      )
    }.bind(this));


    return <div>
      <ul>{locations}</ul>

      <ul>{infos}</ul>
 	  </div>;
  }
}

export default City;
