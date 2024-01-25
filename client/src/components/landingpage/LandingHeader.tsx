import { AiFillThunderbolt } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";

const links = [
  { link: "#Features", label: "Features" },
  { link: "#Contact", label: "Contact" },
  { link: "#Get-Started", label: "Get Started" },
];

export default function LandingHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState<undefined | string>();

  const items = links.map((link: { link: string; label: string }) => (
    <a
      key={link.label}
      href={link.link}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <Container>
      <AiFillThunderbolt size={28} />
      <Group gap={5}>{items}</Group>

      <Burger opened={opened} onClick={toggle} size="sm" />
    </Container>
  );
}
