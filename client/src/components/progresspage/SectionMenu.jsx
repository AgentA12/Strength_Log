import { Tabs } from "@mantine/core";
import { HiOutlineTemplate } from "react-icons/hi";
import { TbBarbell } from "react-icons/tb";
import { BsTools } from "react-icons/bs";
import { BiGitCompare } from "react-icons/bi";
import { useMediaQuery } from "@mantine/hooks";

export default function SectionMenu({ setActiveSection }) {
  const largeScreen = useMediaQuery("(max-width: 48em)");
  return (
    <Tabs
      defaultValue="Summary"
      color="hot-pink"
      onTabChange={setActiveSection}
      my={8}
    >
      <Tabs.List position={largeScreen ? "center" : "left"}>
        <Tabs.Tab
          value="Summary"
          icon={<HiOutlineTemplate size={14} />}
          onClick={() => setActiveSection("Summary")}
        >
          Summary
        </Tabs.Tab>
        <Tabs.Tab
          value="Exercises"
          icon={<TbBarbell size={14} />}
          onClick={() => setActiveSection("Exercises")}
        >
          Exercises
        </Tabs.Tab>
        <Tabs.Tab
          disabled
          value="Utilities"
          icon={<BsTools size={14} />}
          onClick={() => setActiveSection("Utilities")}
        >
          Utilities
        </Tabs.Tab>{" "}
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
