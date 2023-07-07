import { Tabs } from "@mantine/core";
import { HiOutlineTemplate } from "react-icons/hi";
import { BsTools } from "react-icons/bs";
import { BiGitCompare } from "react-icons/bi";
import { useMediaQuery } from "@mantine/hooks";

export default function SectionMenu({ activeSection, setActiveSection }) {
  const largeScreen = useMediaQuery("(max-width: 48em)");
  return (
    <Tabs defaultValue={activeSection} onTabChange={setActiveSection} my={8}>
      <Tabs.List position={largeScreen ? "center" : "left"}>
        <Tabs.Tab
          value="Templates"
          icon={<HiOutlineTemplate size={14} />}
          onClick={() => setActiveSection("Templates")}
        >
          Templates
        </Tabs.Tab>

        <Tabs.Tab
          disabled
          value="Utilities"
          icon={<BsTools size={14} />}
          onClick={() => setActiveSection("Utilities")}
        >
          Utilities
        </Tabs.Tab>
        <Tabs.Tab
          disabled
          value="Compare"
          icon={<BiGitCompare size={14} />}
          onClick={() => setActiveSection("Compare")}
        >
          Compare
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
