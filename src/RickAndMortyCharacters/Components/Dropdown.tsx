import type { optionInterface } from "./Filter";

interface DropdownProps {
  dropDownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: optionInterface[];
  selectedValue: string;
}

const Dropdown = ({
  options = [],
  dropDownChange = () => {},
  selectedValue = "",
}: DropdownProps) => {
  return (
    <div>
      <select
        className="border py-0.5 px-2"
        name=""
        id=""
        onChange={dropDownChange}
      >
        {options.map((d) => (
          <option
            key={d.id}
            value={d.value}
            className={`${selectedValue && selectedValue === d.value ? "bg-amber-500" : ""}`}
          >
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
