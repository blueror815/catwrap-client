import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase';  
import * as C from './styledComponents'



class FbLogin extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyAJU0ypJro4K64IzeO99tX9Mr7C-ulPTbg",
      authDomain: "catwrap-b1983.firebaseapp.com",
      databaseURL: "https://catwrap-b1983.firebaseio.com",
      projectId: "catwrap-b1983",
      storageBucket: "catwrap-b1983.appspot.com",
      messagingSenderId: "57441142146"
    };

    firebase.initializeApp(config);

    window.fbAsyncInit = function() {
      window.FB.init({
        appId: 208862066342867,
        xfbml: true,
        version: 'v2.10'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    this.fbLogin = this.fbLogin.bind(this)
    // this.fbLoginStatus = this.fbLoginStatus.bind(this)
  }

  componentDidMount(){
    let _this = this;
    const { dispatch } = this.props
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        return dispatch({
          type: 'LOGIN_FULFILLED',
          data: user.providerData[0]
        });
      } else {
        return dispatch({
          type: 'LOGIN_REJECTED'
        });
      }
    });
  }

  // fbLoginStatus(e){
  //   if(window.FB != undefined){
  //     window.FB.getLoginStatus(function(response) {
  //       console.log("response: getLoginStatus");
  //       console.log(response);
  //       if (response.status === 'connected') {
  //         console.log(response.authResponse.accessToken);
  //       }
  //     });
  //   }else{
  //     setTimeout(() => {
  //       this.fbLoginStatus()
  //     }, 100);
  //   }
  // }

  fbLogin(e){
    // window.FB.login((response) => {
    //   console.log(response);
    // }, { scope: 'public_profile' })
    const { dispatch } = this.props
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var user = firebase.auth().currentUser;
      if (user) {
        return dispatch({
          type: 'LOGIN_FULFILLED',
          data: user.providerData[0]
        });
      } else {
        return dispatch({
          type: 'LOGIN_REJECTED'
        });
      }
    });
  }

  fbLogOut(e){
    const { dispatch } = this.props
    firebase.auth()
    .signOut()
    .then(function(result) {
      var user = firebase.auth().currentUser;
      if (user) {
        return dispatch({
          type: 'LOGOUT_REJECTED',
          data: user.providerData[0]
        });
      } else {
        return dispatch({
          type: 'LOGOUT_FULFILLED'
        });
      }
    });
  }

  render() {
    return (
      <div>
      {
        this.props.user.loginStatus === 'loggedOut' &&
          <button 
            className="loginBtn loginBtn--facebook"
            onClick={e => this.fbLogin()}>
            Login with Facebook
          </button>
      }
      {
        this.props.user.loginStatus === 'loggedIn' &&
          <button 
            className="loginBtn loginBtn--facebook"
            onClick={e => this.fbLogOut()}>
            Logout
          </button>
      }
      </div>
    )
  }
}

FbLogin.propTypes = {
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  const { user } = state

  return {
    user
  }
}

export default connect(mapStateToProps)(FbLogin)