import SearchIcon from "@/app/icons/SearchIcon.svg?url";
import { useState } from "react";
import { noAccents } from "@/util/utils";
import ImageFb from "./ImageFb";

type SearchBarMenuProps = {
  search_name: string;
  data_array: any[];
  filter_keys: string[];
  onFilter: (filtered_data: any[]) => void;
  onFocus?: () => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function SearchBarMenu({
  search_name,
  data_array,
  filter_keys,
  onFilter,
  onFocus,
  onBlur,
}: SearchBarMenuProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredData = data_array.filter((item) =>
      filter_keys.some((key) =>
        noAccents(String(item[key]).toLowerCase()).includes(
          value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
      )
    );

    onFilter(filteredData);
  };

  return (
    <>
      <div className="wrapper_search_bar">
        <div className="search">
          <input
            spellCheck={false}
            type="text"
            placeholder={`Buscar ${search_name}`}
            value={searchTerm}
            onChange={handleSearch}
            onBlur={(e) => {
              if (typeof onBlur === "function") {
                onBlur(e);
              }
            }}
            onFocus={() => {
              if (typeof onFocus === "function") {
                onFocus();
              }
            }}
          />
          <ImageFb src={SearchIcon} alt="Icono Buscar" width={20} height={20} />
        </div>
      </div>
    </>
  );
}

export default SearchBarMenu;
