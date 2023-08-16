import { Tabs } from "@mantine/core";
import { HiOutlineTemplate } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";

export default function SectionMenu({ activeSection, setActiveSection }) {
  const isLargeScreen = useMediaQuery("(max-width: 48em)");
  return (
    <Tabs defaultValue={activeSection} onTabChange={setActiveSection} my={8}>
      <Tabs.List position={isLargeScreen ? "center" : "left"}>
        <Tabs.Tab
          value="Templates"
          icon={<HiOutlineTemplate size={14} />}
          onClick={() => setActiveSection("Templates")}
        >
          Chart
        </Tabs.Tab>

        <Tabs.Tab
          value="Date"
          icon={<MdDateRange size={14} />}
          onClick={() => setActiveSection("Date")}
        >
          Date
        </Tabs.Tab>
        <Tabs.Tab
          value="Compare"
          icon={<BsTools size={14} />}
          onClick={() => setActiveSection("Utilities")}
        >
          Utilities
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
