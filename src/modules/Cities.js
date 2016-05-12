import React from 'react'
import $ from 'jquery'
import  { Link } from 'react-router'


class Cities extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cities: []
    }
  }

  componentDidMount() {  
    $.ajax({
      url: 'http://api.idescat.cat/emex/v1/nodes.json?tipus=mun',
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
    this.setState({
      cities: data.fitxes.v
    })
  }


  render() {
    var cities = [];

    this.state.cities.forEach(function(city){
      cities.push(
        <li key={city.id}>
          <Link to={`/city/${city.id}`}>{city.content}</Link>
        </li>
      )
    }.bind(this));

    return <div>
      <h2>Cities</h2>

      <ul>
        {cities}
      </ul>
    </div>;
  }
}

export default Cities;
