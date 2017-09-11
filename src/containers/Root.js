import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import * as C from '../components/styledComponents'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <C.Wrapper>
              <C.Header
                        options={[ 'Funny', 'WTF', 'Gaming', 'NSFW' ]} />
              <Route exact path="/" component={AsyncApp}/>
              <Route path="/:categoryid" component={AsyncApp}/>
            </C.Wrapper>
          </Router>
      </Provider>
    )
  }
}
