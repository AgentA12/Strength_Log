import "./global.css";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ErrorPolicy,
  DefaultOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import { MantineProvider, createTheme, ScrollArea, rem } from "@mantine/core";

const isInProduction = import.meta.env.MODE === "production";

type Theme = ReturnType<typeof createTheme>;

const defaultApolloOptions: DefaultOptions = {
  watchQuery: {
    errorPolicy: "ignore" as ErrorPolicy,
    fetchPolicy: "network-only",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all" as ErrorPolicy,
  },
};

export const client = new ApolloClient<NormalizedCacheObject>({
  uri: isInProduction
    ? "https://strengthlog-production-c98f.up.railway.app/graphql"
    : "/graphql",

  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: defaultApolloOptions,
});

const localStoragePreferredColor =
  (localStorage.getItem("preferredColor") as Theme["primaryColor"]) || "teal";

export const theme: Theme = createTheme({
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
    },

    Title: {
      defaultProps: { order: 1 },
    },

    Divider: {
      defaultProps: {
        variant: "dashed",
        labelPosition: "left",
      },
    },
  },
  fontFamily: "Inter",
  primaryColor: localStoragePreferredColor,
  fontSizes: {
    xxl: rem(30),
    xxxl: rem(40)
  }
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <ApolloProvider client={client}>
        <ModalsProvider>
          <Router>
            <App />
          </Router>
        </ModalsProvider>
      </ApolloProvider>
    </MantineProvider>
  </React.StrictMode>
);
