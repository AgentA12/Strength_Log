import { Box, Container } from "@mantine/core";

export default function AppLayout({ children }) {
  return (
    <>
      <Container fluid>
        <Box
          sx={(theme) => ({
            marginLeft: 80,
            marginTop: 25,
            [theme.fn.smallerThan("sm")]: {
              margin: "auto",
              marginBottom: 150,
              padding: 0
            },
          })}
        >
          {children}
        </Box>
      </Container>
    </>
  );
}
