import { useState, useEffect } from "react"
import axios from "axios"
import { FaSearch } from "react-icons/fa"
import SearchResults from "./SearchResult"

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([])
    } else {
      const searchFetch = async () => {
        const res = await axios.get(`/api/search?q=${searchTerm}`)

        const { data } = await res
        setSearchResults(data)
        console.log(data)
      }

      searchFetch()
    }
  }, [searchTerm])

  return (
    <div className="relative bg-gray-600 p-4">
      <div className="container mx-auto flex items-center justify-center md:justify-end">
        <div className="relative text-gray-600 w-72">
          <form>
            <input
              type="search"
              name="search"
              id="search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72"
              placeholder="Search Posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <FaSearch className="absolute top-0 right-0 text-black mt-3 mr-4" />
          </form>
        </div>
      </div>

      <SearchResults results={searchResults} />
    </div>
  )
}
