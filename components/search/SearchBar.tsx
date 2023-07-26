import { useState, useEffect } from "react";
import useDebounce from "../../hook/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchBar = ({ data, setFilteredData, getItemValue }) => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (data && data.length > 0) {
            const newData = data.filter(item => {
                const itemText = getItemValue(item);
                return itemText.toLowerCase().includes(debouncedQuery.toLowerCase());
            });
            setFilteredData(newData);
        }
    }, [debouncedQuery]);

    return (
        <div className="mb-10 w-full max-w-xs lg:max-w-md">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="relative text-dark focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                    id="search"
                    className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-light placeholder:text-white focus:bg-medium focus:text-light focus:ring-0 focus:placeholder:text-lighter sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                    name="search"
                    value={query}
                    onChange={evt => setQuery(evt.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar;