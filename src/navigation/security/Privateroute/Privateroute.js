import React, { useEffect, useState } from 'react';
import { Route, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { authService } from '../service/authService';
import LoadingScreen from '../../../pages/misc/LoadingScreen/LoadingScreen';

const PrivateRoute = (props) => {

    const {
      path,
      component
    } = props

    const [authenticatedPage , setAuthenticatedPage] = useState({
      authenticatedpage: false
    })
    const [loadingPage , setLoadingPage] = useState({
      loadingPage: true
    })
    const [compiledPage , setCompiledPage] = useState({
      compiledPage: false
    })

    useEffect(() => {
      const { authenticated } = props;
      setTimeout(() => {
        if (authenticated === true) {
          setAuthenticatedPage({
            authenticatedpage: true
          })
        } else {
          setAuthenticatedPage({
            authenticatedpage: false
          })
        }
        setLoadingPage({
          loadingPage: false
        })
        setCompiledPage({
          compiledPage: true
        })
      }, 500);

    }, [props])

    /*
    Make sure to user this method whenever we are ready to redirect users with a given authenticated url
    const LoginRedirect = () => {
      const [usernameInput , setUsernameInput] = useState({
          username: ""
      })
      const [password , setPassword] = useState({
          password: ""
      })
      const login_user = () => {
          loginUser(usernameInput.username , password.password).then((res) => {
          }).catch((error) => {
            console.warn(error);
          })
        }
      return (
          <div>
           <div className="container">
            <div className="login-redirect-signin">
              <h3 className="text-center">LOGIN</h3>
              <Input
               placeholder="Username"
               onchange={e => {
                   setUsernameInput({
                       username: e.target.value
                   })
               }}
              />
              <Input
               placeholder="Password"
               type="password"
               onchange={e => {
                   setPassword({
                       password: e.target.value
                   })
               }}
              />
              <ButtonPurple
               title="Login"
               onclick={login_user}
              />
            </div>
           </div>
          </div>
      )
  }
    */

    const Compilepage = ({refreshDone}) => {

      authService.checkAuthStatus((status) => {
        if (status === true) {
          return <Route path={path} component={component} exact />
        } else {
          return <Redirect to="/login" />
        }
      })

       if (refreshDone === true) {
        if (authenticatedPage.authenticatedpage === true) {
          return <Route path={path} component={component} exact />
        } else {
          return <Redirect to="/login" />
        }
       } else {
         return null;
       }
    }

    return (
      <div>
        <LoadingScreen loading={loadingPage.loadingPage} />
        <Compilepage refreshDone={compiledPage.compiledPage} />
      </div>
    )

}

const mapStateToProps = ({
  user: {
    authenticated
  }
}) => {
  return {
    authenticated
  }
}

export default connect(mapStateToProps , null)(PrivateRoute)