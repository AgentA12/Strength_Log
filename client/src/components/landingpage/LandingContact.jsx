import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Center,
  Box,
} from "@mantine/core";

export default function LandingContact() {
  return (
    <Center mx="auto" sx={{ paddingBottom: 50 }} >
      <Box>
        <Title
          order={2}
          size="h1"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`})}
          weight={900}
          align="center"
        >
          Get in touch
        </Title>

        <SimpleGrid
          cols={2}
          mt="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
        />

        <Group position="center" mt="xl">
          <Button type="submit" size="md">
            Send message
          </Button>
        </Group>
      </Box>
    </Center>
  );
}
