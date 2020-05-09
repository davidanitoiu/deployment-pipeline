import { Fab, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";

const useStyles = makeStyles<Theme>((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-around',
    alignItems: 'center',
    height: "100vh",
    backgroundColor: theme.palette.background.paper
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Typography variant={"h1"}>Deployment Pipeline</Typography>
      <Typography variant={"body1"}>
        This is an implementation of the <Link href="https://www.npmjs.com/package/@mrblenny/react-flow-chart">@mrblenny/react-flow-chart'</Link> library.
      </Typography>
      <Typography>
        <Fab component={Link} href="https://github.com/MrBlenny/react-flow-chart">
          <GitHubIcon />
        </Fab>
      </Typography>
    </div>
  );
}

export default App;
