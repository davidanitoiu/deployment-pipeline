import { IChart, IOnLinkCompleteInput } from "@mrblenny/react-flow-chart"
import { some } from "lodash"

export interface ValidateLink extends IOnLinkCompleteInput {
    chart: IChart
}

export const validateLink = ({
    fromNodeId,
    fromPortId,
    toNodeId,
    toPortId,
    chart,
}: ValidateLink): boolean => {
    const linkTuple = {
        from: {
            nodeId: fromNodeId,
            portId: fromPortId,
        },
        to: {
            nodeId: toNodeId,
            portId: toPortId,
        },
    }


    const validType = !(
        chart.nodes[fromNodeId].ports[fromPortId].type ===
        chart.nodes[toNodeId].ports[toPortId].type
    )

    
    const targetIsParentNode = some(chart.links, link => link.from.nodeId === linkTuple.to.nodeId);
    const sourceHasNoParent = some(chart.links, link => link.to.nodeId === linkTuple.from.nodeId);
    const noLoop =  !(targetIsParentNode && sourceHasNoParent)

    return validType && noLoop
}