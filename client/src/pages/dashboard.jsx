import { Center, Grid } from "@mantine/core";
import { Calendar, TemplateSection } from "../components/homepage/index";

export default function DashBoardPage() {
  return (
    <Grid grow justify="center">
      <Grid.Col order={{base: 2, md: 1}} span={{ md: 8, base: 7 }}>
        <TemplateSection />
      </Grid.Col>

      <Grid.Col order={{base: 1, md: 2}} span={{ md: 4, base: 7 }}>
        <Center>
          <Calendar />
        </Center>
      </Grid.Col>
    </Grid>
  );
}
