import { useState } from "react"
// import DerivWorldList from "../asset/DerivWorldList";
import RootWorldList from "../asset/RootWorldList";
import SearchBar from "./SearchBar";

const SearchWorldSection = ({ data, ...props }) => {
    const [filteredData, setFilteredData] = useState(data);

    const getItemValue = (item) => {
        return item.name;
    }

    return (
        <div>
            <SearchBar data={data} getItemValue={getItemValue} setFilteredData={setFilteredData} />
            <RootWorldList data={filteredData} infiniteScroll={false} {...props} />
        </div>
    );
}

export default SearchWorldSection;