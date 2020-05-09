import { random } from "lodash"

export const sidebarItemProps = {
    type: "input-output",
    ports: {
        port1: {
            id: "port1",
            type: "left",
        },
        port2: {
            id: "port2",
            type: "right",
        },
    },
    position: {
        x: random(100,500),
        y: random(100,500)
    }
}

export const chartTemplate = {
    scale: 1,
    offset: {
        x: 0,
        y: 0
    },
    nodes: {},
    links: {},
    selected: {},
    hovered: {}
}

export const nodeTemplate = {
    orientation: 0,
    type: 'input-output',
    ports: {
        port1: {
            id: 'port1',
            type: 'left',
            position: {
                x: 0,
                y: 24.5
            }
        },
        port2: {
            id: 'port2',
            type: 'right',
            position: {
                x: 200,
                y: 24.5
            }
        }
    }
}
