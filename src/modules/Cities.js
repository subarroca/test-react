import React from 'react'
import $ from 'jquery'
import  { Link } from 'react-router'


class Cities extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cities: []
    }


    this.currentColorIndex = -1
    this.colors = ['transparent', 'wheat']
  }

  componentDidMount() {  
    this.handleChangeStyle()

    console.time('loadCities')

    $.ajax({
      url: 'http://api.idescat.cat/emex/v1/nodes.json?tipus=mun',
      dataType: 'json',
      cache: false,
      success: function(data){
        console.timeEnd('loadCities');
        console.time('renderCities');
        this.setState({
          cities: data.fitxes.v
        })

        setTimeout(
          function() {
            console.timeEnd('renderCities')
          }
        )
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }

  handleChangeStyle(){
    console.time('styleChange');

    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    this.setState({
      currentColor: this.colors[this.currentColorIndex]
    });

    setTimeout(
      function() {
        console.timeEnd('styleChange');
      }
    );
  }


  render() {
    var cities = [];


    this.state.cities.forEach(function(city){
      cities.push(
        <CitiesListItem
          city={city}
          key={city.id}
          bgColor={this.state.currentColor}>
        </CitiesListItem>
      )
    }.bind(this));


    return <div>
      <button
        onClick={this.handleChangeStyle.bind(this)}>
        Change Style
      </button>

      <ul>
        {cities}
      </ul>
    </div>;
  }
}



class CitiesListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      city: this.props.city
    }
  }

  handleChange(event, field){
    console.time('inputChange');

    this.props.city[field] = event.target.value;
    this.setState({
      city: this.props.city
    });

    setTimeout(
      function() {
        console.timeEnd('inputChange');
      }
    );
  }


  handleContentChange(event){
    this.handleChange(event, 'content')
  }

  handleIdChange(event){
    this.handleChange(event, 'id')
  }

  handleSchemeChange(event){
    this.handleChange(event, 'scheme')
  }


  render() {

    var labelStyle = {
      display: 'inline-block',
      width: 200,
      background: this.props.bgColor
    }


    return <li>
      <Link
        to={`/city/${this.state.city.id}`}
        style={labelStyle}>
        {this.state.city.content}
      </Link>

      <input
        type="text"
        value={this.state.city.content}
        onChange={this.handleContentChange.bind(this)}
      />

      <input
        type="text"
        value={this.state.city.id}
        onChange={this.handleIdChange.bind(this)}
      />

      <input
        type="text"
        value={this.state.city.scheme}
        onChange={this.handleSchemeChange.bind(this)}
      />

      <input
        type="text"
        value={this.state.city.id}
        onChange={this.handleIdChange.bind(this)}
      />
    </li>;
  }
}




export default Cities;
