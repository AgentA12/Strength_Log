import { Tabs } from "@mantine/core";
import { HiOutlineTemplate } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { BsTools } from "react-icons/bs";
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
         By Templates
        </Tabs.Tab>

        <Tabs.Tab
          
          value="Date"
          icon={<MdDateRange size={14} />}
          onClick={() => setActiveSection("Utilities")}
        >
          By Date
        </Tabs.Tab>
        <Tabs.Tab
          disabled
          value="Compare"
          icon={<BsTools size={14} />}
          onClick={() => setActiveSection("Compare")}
        >
          Utilities
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
