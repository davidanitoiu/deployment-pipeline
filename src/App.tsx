import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import store from "./utils/store";

const useStyles = makeStyles<Theme>((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.app}>
        <Typography variant={"h1"}>Magic Happens Here</Typography>
      </div>
    </Provider>
  );
}

export default App;
