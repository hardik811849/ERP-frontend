import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

const Theme = extendTheme({
    colors: {
        brand: {
            100: "#000000", //black
            200: "#FFFFFF", //white
            300: ""

        }
    },
    fonts: {
        heading: ``,
        body: ``
    },

    components: {
        Button: {
            varients: {
                Simple: (props) => ({
                    rounded: 'md',

                })
            }
        }
    }

})

export default Theme;