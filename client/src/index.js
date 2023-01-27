import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  typePolicies: {
    Query: {
      fields: {
        feed: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: "dark",
        colors: {
          grape: [
            "#EDE7F6",
            "#D1C4E9",
            "#B39DDB",
            "#9575CD",
            "#7E57C2",
            "#673AB7",
            "#5E35B1",
            "#7B1FA2",
            "#6A1B9A",
            "#311B92",
          ],
        },
      }}
    >
      <ModalsProvider>
        <NotificationsProvider position="bottom-right" limit={5}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ApolloProvider>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
