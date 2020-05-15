import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple['A400']
        },
        secondary: {
            main: deepPurple['500']
        },
    },
});

export default theme;