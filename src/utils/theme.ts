import { createMuiTheme } from "@material-ui/core";
import { orange, teal } from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: orange,
        secondary: teal,
    }
});