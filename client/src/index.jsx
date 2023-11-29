import "@mantine/core/styles.css";
import '@mantine/core/styles/global.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MantineProvider, createTheme } from "@mantine/core";
import colors  from "./utils/mockdata/themecolors";

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
  },

  globalStyles: () => ({}),
  fontFamily: "Inter",
  colorScheme: "dark",
  loader: "bars",
  colors: {
    brand: colors.magenta,
   
  },
  primaryColor: "brand",
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles defaultColorScheme="dark" theme={theme}>
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
