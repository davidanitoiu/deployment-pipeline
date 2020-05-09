import { map, omit, isEqual } from "lodash"
import { IOnLinkCompleteInput, IChart } from "@mrblenny/react-flow-chart"

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

    const differentNodes = fromNodeId !== toNodeId

    const validType = !(
        chart.nodes[fromNodeId].ports[fromPortId].type ===
        chart.nodes[toNodeId].ports[toPortId].type
    )

    // no duplicate links
    const noDuplicates = !map(chart.links, link =>
        omit(link, "id")
    ).some(link => isEqual(link, linkTuple))

    return validType && noDuplicates && differentNodes
}