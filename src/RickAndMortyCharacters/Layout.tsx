import Filter, { type optionInterface } from "./Components/Filter";
import Characters from "./Components/Characters";
import useApiCall from "./Hooks/useApiCall";
import { useCallback, useMemo, useState } from "react";

const URL = "https://rickandmortyapi.com/api/character";

const statusOptions: optionInterface[] = [
  { id: 1, label: "All", value: "all" },
  { id: 2, label: "Alive", value: "alive" },
  { id: 3, label: "Dead", value: "dead" },
  { id: 4, label: "Unknown", value: "unknown" },
];

const sortOptions: optionInterface[] = [
  { id: 1, label: "Sort A-Z", value: "az" },
  { id: 2, label: "Sort Z-A", value: "za" },
];

const Layout = () => {
  const [search, setSearch] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("");
  const { data = [], loading = false, error = false } = useApiCall(URL);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const seachValue = event.target?.value;
      setSearch(seachValue);
    },
    [],
  );

  const handleDropdownChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
      const seachValue = event.target?.value;
      if (type === "sort") {
        setSortValue(seachValue);
      } else {
        setStatusValue(seachValue);
      }
    },
    [],
  );

  // Derived data (optimized)
  const charactersList = useMemo(() => {
    let result = [...data];

    const searchKey = search.toLowerCase();
    const statusKey = statusValue.toLowerCase();

    // 1. Filter by status
    if (statusKey && statusKey !== "all") {
      result = result.filter((item) => item.status.toLowerCase() === statusKey);
    }

    // 2. Search by name
    if (searchKey) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchKey),
      );
    }

    // 3. Sort alphabatically
    if (sortValue === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [data, search, sortValue, statusValue]);

  if (loading) return <p>Loading characters...</p>;

  if (error) return <p>Failed to fetch, Something went wrong...</p>;

  return (
    <div className="flex flex-col gap-2 items-center">
      <h1>Rick And Morty Characters</h1>
      <Filter
        onChange={handleChange}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
        dropDownChange={handleDropdownChange}
        sortValue={sortValue}
        statusValue={statusValue}
      />

      {charactersList.length === 0 && <h1>No Character Found</h1>}
      <Characters charactersData={charactersList} />
    </div>
  );
};

export default Layout;
