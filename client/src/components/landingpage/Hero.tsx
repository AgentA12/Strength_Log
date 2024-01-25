import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./index";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Container mt={50} size={1400}>
      <Dots style={{ left: 60, top: 0 }} />
      <Dots style={{ left: 0, top: 140 }} />
      <Dots style={{ right: 0, top: 60 }} />
      <Dots style={{ right: 0, top: 70 }} />
      <Dots style={{ right: 0, top: 80 }} />
      <Dots style={{ right: 60, top: 250 }} />
      <Dots style={{ left: 350, top: 500 }} />
      <Dots style={{ right: 390, top: -25 }} />

      <div>
        <Text>Strength Log</Text>
        <Title>
          Less Writing. More{" "}
          <Text span inherit>
            Lifting.
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="xl" color="dimmed">
            Strength Log is the simplest, most intuitive workout tracking
            experience. Take your training to the next level.
          </Text>
        </Container>

        <div>
          <Button size="lg" component={Link} to="/login">
            Get Started
          </Button>
        </div>
      </div>
    </Container>
  );
}
