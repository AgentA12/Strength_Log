import { Tabs } from "@mantine/core";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";

export default function SectionMenu({activeSection, setActiveSection }) {
  const isLargeScreen = useMediaQuery("(max-width: 48em)");
  return (
    <Tabs value={activeSection} onTabChange={setActiveSection} my={10}>
      <Tabs.List position={isLargeScreen ? "center" : "left"}>
        <Tabs.Tab
          value="Chart"
          icon={<AiOutlineLineChart size={14} />}
          onClick={() => setActiveSection("Chart")}
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
