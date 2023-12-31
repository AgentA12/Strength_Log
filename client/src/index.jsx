import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MantineProvider, createTheme, ScrollArea } from "@mantine/core";

const defaultOptions = {
  watchQuery: {
    errorPolicy: "ignore",
  },
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
          keyArgs: false,
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
      defaultProps: {
        scrollAreaComponent: ScrollArea.Autosize,
      },
      styles: (theme) => ({
        content: {
          border: "1px solid",
          borderColor: theme.colors.dark[4],
          borderRadius: "0.5em",
          overflow: "hidden",
        },
      }),
    },

    Divider: {
      defaultProps: {
        variant: "dashed",
        labelPosition: "left",
      },
      styles: () => ({}),
    },
  },

  globalStyles: () => ({}),
  fontFamily: "Inter",
  colorScheme: "dark",
  loader: "spinner",
  colors: {},
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
