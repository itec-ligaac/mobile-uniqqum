import { Dimensions, Platform } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const colors = {
  main: "#46D0D9",
  primary: "#64B5F6",
  secondary: "#FFE358",
  tertiary: "#FFE358",
  accent: "#F3534A",
  greeny: "#0AC4BA",
  black: "#323643",
  white: "#FFFFFF",
  gray: "#9DA3B4",
  gray2: "#C5CCD6",
  notes: "#03A9F4",
  recipes: "#4DB6AC",
  pros: "#00796B",
  profile: "#B00020",
  workout: "#FF5252",
  meals: "#004D40",
  settings: "#455A64",
  account: "#F44336",
  measure: "#ff8d00",
  help: "#009688",
};

const screen = {
  height: windowHeight,
  width: windowWidth,
};
const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
};

const shadow = {
  shadowModal: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 3,
  },
  shadowView: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.46,
        elevation: 3,
      },
      android: {
        elevation: 0.3,
        borderBottomWidth: 0.1,
        borderTopWidth: 0.1,
        borderLeftWidth: 2,
        borderColor: colors.gray2,
      },
    }),
  },
};

const stls = {
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: screen.width * 0.5,
    height: screen.height * 0.05,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
};

export { colors, sizes, fonts, screen, shadow, stls };
