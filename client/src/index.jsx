import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MantineProvider, createTheme } from "@mantine/core";

let colors = {
  cyan: [
    "#e0fffc",
    "#cdfdf8",
    "#a0f9ed",
    "#6ef6e3",
    "#47f3db",
    "#2ef1d6",
    "#18f0d3",
    "#00d5ba",
    "#00bea5",
    "#00a58e",
  ],

  magenta: [
    "#ffeaf3",
    "#fdd4e1",
    "#f4a7bf",
    "#ec779c",
    "#e64f7e",
    "#e3356b",
    "#e22762",
    "#c91a52",
    "#b41149",
    "#9f003e",
  ],
  peterriver: [
    "#E0F7FF",
    "#A4E6FF",
    "#8BD1FF",
    "#38C8FF",
    "#08BBFF",
    "#00AFFF",
    "#00A2FF",
    "#0090FF",
    "#0080F5",
  ],
  nephritis: [
    "#B4FFD7",
    "#6CFFAC",
    "#3EF58B",
    "#20E071",
    "#27AE60",
    "#15954B",
    "#07813B",
    "#00712D",
    "#006024",
    "#004C1C",
    "#003D17",
  ],

  teal: [
    "#B3FFF5",
    "#63FFEB",
    "#20FFE2",
    "#00FFCC",
    "#00DFAF",
    "#00B38C",
    "#008F70",
    "#00725A",
    "#005B48",
    "#004939",
  ],

  sunflower: [
    "#FFF6D2",
    "#FFEC9D",
    "#FFE26E",
    "#FFD059",
    "#FFD118",
    "#FFCA00",
    "#FFBC00",
    "#F5A700",
    "#DA9500",
    "#C28500",
  ],
};

const defaultOptions = {
  // watchQuery: {
  //   errorPolicy: "ignore",
  // },
  query: {
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: defaultOptions,
  typePolicies: {
    Query: {
      fields: {
        feed: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const theme = createTheme({
  components: {
    Button: {
      defaultProps: {
        variant: "outline",
      },
    },
    Modal: {
      styles: (theme) => ({
        content: {
          border: "1px solid",
          borderColor: theme.colors.dark[4],
          borderRadius: "0.5em",
        },
      }),
    },

    Divider: {
      defaultProps: {
        variant: "dashed",
        labelPosition: "left",
      },
      styles: (theme) => ({}),
    },
  },

  globalStyles: () => ({}),
  fontFamily: "Inter",
  colorScheme: "dark",
  loader: "spinner",
  colors: {
    // dark: [
    //   "#fff",
    //   "#fff",
    //   "#666",
    //   "#333",
    //   "#333",
    //   "#111",
    //   "#000",
    //   "#000",
    //   "#000",
    //   "#000",
    // ],
  },
  primaryColor: "teal",
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      defaultColorScheme="dark"
      theme={theme}
    >
      <ApolloProvider client={client}>
        <ModalsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalsProvider>
      </ApolloProvider>
    </MantineProvider>
  </React.StrictMode>
);
