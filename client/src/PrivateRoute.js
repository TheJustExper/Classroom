import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./providers/UserProvider";

export default ({ component: Component, setPopup, setToggledTheme, path, ...rest }) => {
    const { user, loading } = useContext(UserContext);

    return (
      <Route
        {...rest}
        render={(props) => {
          if (loading) return <div id="loader"></div>;
          if (user) return <Component setPopup={setPopup} setToggledTheme={setToggledTheme} {...props} />
          return <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        }}
      />
    )
  }