import type { ResponseInterface } from "../Hooks/useApiCall";
import Card from "./Card";

interface CharactersProps {
  charactersData: ResponseInterface[];
}

const Characters = ({ charactersData = [] }: CharactersProps) => {
  return (
    <div className="flex flex-wrap gap-1 justify-center items-center">
      {charactersData?.map((data) => (
        <Card character={data} key={data.id}/>
      ))}
    </div>
  );
};

export default Characters;
