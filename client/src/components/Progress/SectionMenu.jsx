export const SectionMenu = ({activeSection, setActiveSection}) => {
  return (
    <ul className="flex gap-10">
      <li>
        <p
          onClick={() => setActiveSection("Summary")}
          className={`${
            activeSection === "Summary" ? "text-primary" : null
          } cursor-pointer`}
        >
          Summary
        </p>
      </li>
      <li>
        <p
          onClick={() => setActiveSection("Exercises")}
          className={`${
            activeSection === "Exercises" ? "text-primary" : null
          } cursor-pointer`}
        >
          Exercises
        </p>
      </li>
    </ul>
  );
};
