/** @jsx React.DOM */

module.exports = function(React, _, PageMixin, PromptMixin) {
  return React.createClass({

    mixins: [PageMixin, PromptMixin],

    handleLogin: function(e) {
      e.preventDefault();

      window.location.hash = '/home'
    },

    render: function() {
      var self = this;

      return (
        <div className="intro-header">
          <div className="container">

            <div className="row">
              <div className="col-lg-12">
                <div className="intro-message">
                  <h1>Join Synereo</h1>
                  <h3>Your life and ideas in a <em>private, secure, and decentralized</em> environment.</h3>
                  <hr className="intro-divider" />
                  <div className="text-center" style={{padding: '50px 0'}}>
                    <div className="sy-form-compact">
                      <form id="register-form" className="text-left">
                        <div className="login-form-main-message"></div>
                        <div className="main-login-form">
                          <div className="login-group">
                            <div className="form-group">
                              <label for="reg_fullname" className="sr-only">Full Name</label>
                              <input type="text" className="form-control" id="reg_fullname" name="reg_fullname" placeholder="full name" />
                            </div>
                            <div className="form-group">
                              <label for="reg_username" className="sr-only">Email address</label>
                              <input type="text" className="form-control" id="reg_username" name="reg_username" placeholder="username" />
                            </div>
                            <div className="form-group">
                              <label for="reg_password" className="sr-only">Password</label>
                              <input type="password" className="form-control" id="reg_password" name="reg_password" placeholder="password" />
                            </div>
                            <div className="form-group">
                              <label for="reg_password_confirm" className="sr-only">Password Confirm</label>
                              <input type="password" className="form-control" id="reg_password_confirm" name="reg_password_confirm" placeholder="confirm password" />
                            </div>
                            <div className="form-group">
                              <label for="reg_email" className="sr-only">Email</label>
                              <input type="text" className="form-control" id="reg_email" name="reg_email" placeholder="email" />
                            </div>
                            <div className="form-group login-group-checkbox">
                              <input type="checkbox" className="" id="reg_agree" name="reg_agree" />
                              <label for="reg_agree">I agree with <a href="#/terms">terms</a></label>
                            </div>
                          </div>
                          <button className="login-button" onClick={self.handleLogin}><i className="fa fa-chevron-right"></i></button>
                        </div>
                        <div className="etc-login-form">
                          <p>already have an account? <a href="#/login">login here</a></p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="clearfix"></div>

          </div>
        </div>
      );

    }
  });
};