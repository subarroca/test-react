import React from 'react'
import  { Link } from 'react-router'

export default React.createClass({
  render() {
    return <div>
      <h2>Welcome to React</h2>

      <nav>
        <Link to="/about">About</Link>
        <Link to="/cities">Cities</Link>
        <Link to="/city/0">City</Link>
      </nav>


      {/* outlet */}
      {this.props.children}
    </div>
  }
})

