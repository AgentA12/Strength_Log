import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles.css";

// on updating / saving a workout then navigating to progress, apollo keeps old progress results unless refresh
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
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
      inherit
      theme={{
        colorScheme: "dark",

        focusRingStyles: {
          resetStyles: () => ({ outline: "none" }),

          PasswordInputStyles: (theme) => ({
            outline: `1px solid ${theme.colors.grape[6]}`,
            ":focus-within": `1px solid ${theme.colors.grape[6]}`,
          }),
          inputStyles: (theme) => ({
            outline: `1px solid ${theme.colors.grape[6]}`,
          }),
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
