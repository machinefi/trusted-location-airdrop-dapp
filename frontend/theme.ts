import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Button: {
      variants: {
        solid: {
          size: "xs",
          color: "white",
          fontWeight: "bold",
          borderRadius: "md",
          borderColor: "white",
          borderWidth: "1px",
          bgGradient: "linear(to-l, #7928CA, #FF0080)",
          _hover: {
            bgGradient: "linear(tred.100 0%, orange.100 25%, yellow.100 50%)",
            color: "black",
          },
        },
      },
    },
  },
});

export default theme;
