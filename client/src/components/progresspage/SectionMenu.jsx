import { Tabs } from "@mantine/core";
import { HiOutlineTemplate } from "react-icons/hi";
import { TbBarbell } from "react-icons/tb";
import { BsTools } from "react-icons/bs";
import { BiGitCompare } from "react-icons/bi";

export default function SectionMenu({ setActiveSection }) {
  return (
    <Tabs defaultValue="Summary" variant="outline" onTabChange={setActiveSection} mt={8}>
      <Tabs.List>
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
