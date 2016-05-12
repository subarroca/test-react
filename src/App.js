import React from 'react'
import  { Link } from 'react-router'
import { Translate, LocaleProvider, LocaleSwitch } from 'react-translate-maker'



const DEFAULT_LOCALE = 'en';
const TRANSLATIONS = {
  ca: {
    app: {
      welcome: 'Benvingut {$name}'
    }
  },
  es: {
    app: {
      welcome: 'Bienvenido {$name}'
    }
  },
  en: {
    app: {
      welcome: 'Welcome {$name}'
    }
  }
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      locale: DEFAULT_LOCALE,

      name: 'Mr Marshall'
    };
  }

  handleLocaleChange(locale) {
    this.setState({
      locale: locale
    });
  }

  render() {
    return <div>
      <LocaleProvider adapter={TRANSLATIONS} locale={this.state.locale}>
        <Translate path="app.welcome" name={this.state.name} tagName="h2"/>

      </LocaleProvider>
      <div>
        <a onClick={() => this.handleLocaleChange('ca')}>ca</a>&nbsp;
        <a onClick={() => this.handleLocaleChange('es')}>es</a>&nbsp;
        <a onClick={() => this.handleLocaleChange('en')}>en</a>
      </div>

      <nav>
        <Link to="/about">About</Link>
        <Link to="/cities">Cities</Link>
        <Link to="/city/0">City</Link>
      </nav>
      


      {/* outlet */}
      {this.props.children}
    </div>;
  }
}


export default App