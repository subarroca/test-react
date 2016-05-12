import React from 'react';


class About extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      submitted: false,
      person: {
        name: 'Henry Gale',
        email: 'magician@oz.net',
        age: 13
      },
      nameError: false,
      emailError: false,
      formError: false
    }

  }

  handleSubmit() {
    this.setState({
      submitted: true
    })
  }

  handleEdit(){
    this.setState({
      submitted: false
    }) 
  }

  handleChange(event, field){
    this.state.person[field] = event.target.value;
    this.setState({
      person: this.state.person
    });
  }

  handleNameChange(event){
    this.handleChange(event, 'name')
  }

  handleEmailChange(event){
    this.handleChange(event, 'email')
  }

  handleAgeChange(event){
    this.handleChange(event, 'age')
  }

  handleBlur(event, field){
    var nameError = this.state.nameError
    var emailError = this.state.emailError

    switch(field) {
      case 'name':
        nameError = event.target.value.length == 0

        break;
      case 'email':
        emailError = ! event.target.value.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/)
        
        break;
    }

    this.setState({
      nameError: nameError,
      emailError: emailError,
      formError: nameError || emailError
    })
  }

  handleNameBlur(event){
    this.handleBlur(event, 'name')
  }

  handleEmailBlur(event){
    this.handleBlur(event, 'email')
  }


  render() {
    return <div>
      <h1>Hero Form</h1>

      { !this.state.submitted
        ?
        <div>
          <form
            onSubmit={this.handleSubmit.bind(this)}>
            
            <div>
              <label>Name</label>
              <input
                type="text"
                value={this.state.person.name}
                onChange={this.handleNameChange.bind(this)}
                onBlur={this.handleNameBlur.bind(this)}
                className={this.state.nameError ? 'invalid' : 'valid'} />
            </div>
            { this.state.nameError
              ?
              <div className="alert">
                Name is required
              </div>
              :null
            }
          
            <div>
              <label>Email</label>
              <input type="text"
                value={this.state.person.email}
                onChange={this.handleEmailChange.bind(this)}
                onBlur={this.handleEmailBlur.bind(this)}
                className={this.state.emailError ? 'invalid' : 'valid'} />
            </div>
            
            { this.state.emailError
              ?
              <div className="alert">
                Email must match x@x.x
              </div>
              :null
            }
          
            <div>
              <label>Age</label>
              <input type="number"
                value={this.state.person.age}
                onChange={this.handleAgeChange.bind(this)}
                min="13"
                className="valid" />
            </div>
          
            <button
              type="submit"
              disabled="this.state.formError">
              Submit
            </button>
          </form>
        </div>


      :
        <div>
          <h2>You submitted the following:</h2>
          <div>
            <strong>Name</strong>
            <span>{ this.state.person.name }</span>
          </div>
          <div>
            <strong>Email</strong>
            <span>{ this.state.person.email }</span>
          </div>
          <div>
            <strong>Age</strong>
            <span>{ this.state.person.age }</span>
          </div>
          <br/>
          
          <button
            onClick={this.handleEdit.bind(this)}>
            Edit
          </button>
        </div>
      }
    </div>;
  }
}

export default About;
