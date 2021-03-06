import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, IconButton, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { Add, ExpandMore } from "@material-ui/icons";
import { find, isEmpty, kebabCase } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InteractiveFlowchart } from "./components/InteractiveFlowchart";
import { RootState } from "./utils/store";
import { addPipeline } from "./utils/store/actions/pipeline";

const useStyles = makeStyles<Theme>((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
  },
  input: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  addButton: {
    margin: theme.spacing(1),
  },
  pipelines: {
    flex: 1,
    width: "90%",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pipelines } = useSelector(
    (state: RootState) => state.pipeline
  );
  const [pipelineName, setPipelineName] = useState("");

  const isValidName = (pipelineName: string) => {
    const exists = find(pipelines, { title: pipelineName });
    return !isEmpty(pipelineName) && !exists;
  };
  const createPipeline = () => {
    if (isValidName(pipelineName)) {
      dispatch(addPipeline(pipelineName));
      setPipelineName("");
    }
  };
  const handlePipelineNameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => setPipelineName(target.value);
  const handleEnter = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      createPipeline();
    }
  };

  return (
    <div className={classes.app}>
      <div className={classes.input}>
        <TextField
          variant={"outlined"}
          value={pipelineName}
          label={"Enter new pipeline Name"}
          onChange={handlePipelineNameChange}
          onKeyDown={handleEnter}
        />
        <IconButton className={classes.addButton} onClick={createPipeline}>
          <Add />
        </IconButton>
      </div>
      <div className={classes.pipelines}>
        {pipelines.map((pipeline) => (
          <ExpansionPanel key={pipeline.title}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls={`${kebabCase(pipeline.title)}-content`}
            >
              <Typography variant={"overline"}>
                {pipeline.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <InteractiveFlowchart title={pipeline.title} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    </div>
  );
}

export default App;
