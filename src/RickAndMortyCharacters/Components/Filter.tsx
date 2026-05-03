import { memo } from "react";
import Dropdown from "./Dropdown";

export interface optionInterface {
  id: number;
  label: string;
  value: string;
}

export interface FilterProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dropDownChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string,
  ) => void;
  statusOptions: optionInterface[];
  sortOptions: optionInterface[];
  sortValue: string;
  statusValue: string;
}

const Filter = ({
  onChange = () => {},
  dropDownChange = () => {},
  statusOptions = [],
  sortOptions = [],
  sortValue = "",
  statusValue = "",
}: FilterProps) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      <input
        className="border py-0.5 px-2 "
        placeholder="Search by name..."
        onChange={onChange}
      />

      <Dropdown
        options={statusOptions}
        dropDownChange={(e) => dropDownChange(e, "status")}
        selectedValue={statusValue}
      />

      <Dropdown
        options={sortOptions}
        dropDownChange={(e) => dropDownChange(e, "sort")}
        selectedValue={sortValue}
      />
    </div>
  );
};

export default memo(Filter);
