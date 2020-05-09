import { Checkbox, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core"
import React, { useContext } from "react"
import { useDispatch } from "react-redux"
import { PipelineContext, setChartProperty } from "../utils"
import { setAutoDeploy } from "../utils/store/actions/pipeline"

function EnvironmentProperties() {
  const dispatch = useDispatch()
  const { chart, chartDispatch } = useContext(PipelineContext)!
  const selectedId = chart.selected.id
  const selectedProps = chart.nodes[selectedId!].properties

  const handleAutoDeploy = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch(setAutoDeploy({ selectedNodeName: selectedProps.name, checked }))
    chartDispatch(
      setChartProperty({
        nodeId: selectedId!,
        name: "autoDeploy",
        value: checked,
      })
    )
  }

  return (
    <div>
      <List>
        <ListItem>
          <ListItemText primary={"Name"} secondary={selectedProps.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary={"OS"} secondary={selectedProps.os} />
        </ListItem>
        <ListItem>
          <ListItemText primary={"Kernel"} secondary={selectedProps.kernel} />
        </ListItem>
        <ListItem>
          <ListItemText primary={"Host"} secondary={selectedProps.host} />
        </ListItem>
        <ListItem>
          <ListItemText primary={"Auto Deploy"} />
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              onChange={handleAutoDeploy}
              color={"primary"}
              checked={selectedProps.autoDeploy}
              name={selectedProps.name}
              inputProps={{
                "aria-label": selectedProps.name,
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  )
}

export default EnvironmentProperties
