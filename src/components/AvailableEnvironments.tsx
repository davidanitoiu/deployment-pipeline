import { Divider, List, ListItem, ListItemText, makeStyles, Theme, Typography } from "@material-ui/core";
import { INode } from "@mrblenny/react-flow-chart";
import { difference, find, map } from "lodash";
import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { PipelineContext } from "../utils";
import { RootState } from "../utils/store";
import { addNode } from "../utils/store/actions/pipeline";
import { sidebarItemProps } from "../utils/templates";

const useStyles = makeStyles<Theme>((theme) => ({
  sidebarItem: {
    cursor: "grab",
  },
}));

function AvailableEnvironments({ title }: { title: string }) {
  const dispatch = useDispatch();
  const environments = useSelector((state: RootState) => state.environments);
  const pipeline = useSelector(
    (state: RootState) => find(state.pipeline.pipelines, { title })!.chart
  );
  const { chart } = useContext(PipelineContext)!;
  const classes = useStyles();

  const diff = useMemo(() => {
    const nodeTitles = map(chart.nodes, (node) => node.properties.name);
    const envNames = map(environments, (environment) => environment.name);

    return difference(envNames, nodeTitles);
    // eslint-disable-next-line
  }, [chart.nodes]);

  useEffect(() => {
    if (Object.keys(chart.nodes).length > pipeline.nodes.length) {
      const nodeTitles = map(chart.nodes, (node) => node.properties.name);
      const pipelineNodeTitles = map(pipeline.nodes, (node) => node.name);
      const diff = difference(nodeTitles, pipelineNodeTitles);
      const newNode =  find(chart.nodes, (node) => node.properties.name === diff[0])!;
      dispatch(addNode(newNode));
    }
    // eslint-disable-next-line
  }, [chart.nodes]);

  const getChartData = (environmentName: string): INode => {
    const env = find(
      environments,
      (environment) => environment.name === environmentName
    );
    return {
      ...sidebarItemProps,
      id: v4(),
      type: sidebarItemProps.type,
      ports: sidebarItemProps.ports,
      position: sidebarItemProps.position,
      properties: {
        ...env!,
      },
    };
  };

  return (
    <>
      <Typography variant={"overline"} align={"center"}>Drag & Drop</Typography>
      <Divider />
    <List>
      {diff.map((environment, i) => (
        <ListItem
          key={environment}
          className={classes.sidebarItem}
          draggable={true}
          onDragStart={(event: React.DragEvent<HTMLElement>) => {
            const data = getChartData(environment);
            event.dataTransfer.setData(
              "react-flow-chart",
              JSON.stringify(data)
            );
          }}
        >
          <ListItemText primary={environment} />
        </ListItem>
      ))}
    </List>
    </>
  );
}

export default AvailableEnvironments;
