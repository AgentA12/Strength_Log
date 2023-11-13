import { Container, Grid, Divider, Title, Stack } from "@mantine/core";
import { Calendar, TemplateSection } from "../components/homepage/index";

export default function HomePage() {
  return (
    <Container fluid>
      <Divider variant="dashed" label={<Title>DashBoard</Title>} />
      <Grid columns={7} gutter={0}>
        <Grid.Col order={2} orderLg={1} span={4} lg={5} mt={20}>
          <TemplateSection />
        </Grid.Col>

        <Grid.Col order={1} orderLg={2} span={4} lg={2}>
          <Stack align="center" justify="start">
            <Calendar />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
