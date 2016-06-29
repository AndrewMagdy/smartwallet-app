import Reflux from 'reflux'
import Account from 'actions/account'
import $ from 'jquery'

let AccountStore = Reflux.createStore({
  listenables: Account,

  getInitialState() {
    return {
      username: localStorage.getItem('fake-user')
    }
  },

  onSignup(data) {
    $.ajax({
      type: "POST", 
      url: "https://proxy.webid.jolocom.com/register", 
      data: {username: data.username , password: data.password}, 
      success: function(res, txt, head) { 
        console.log('success!') 
        console.log(head.getAllResponseHeaders()) 
      } 
    })
	  console.log('registering with the data: ', data)	
  },

  onLogin(username, password) {
    $.ajax({ 
      type: "POST", 
      url: "https://proxy.webid.jolocom.com/login", 
      xhrFields: {withCredentials: true},  
      data: {username: username, password: password}, 
      
      // Res_body is the response body, 2 more arguments are passed to the success callback,
      // but they are not of any use now.
      success: function(res_body) { 
        console.log(res_body)
        this.trigger({username: res_body.webid})
      } 
    }) 
  },

  onLogout() {
    localStorage.removeItem('fake-user')
    this.trigger({username: null})
  },

  loggedIn() {
    return localStorage.getItem('fake-user')
  }
})

export default AccountStore
