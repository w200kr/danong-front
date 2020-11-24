import React from "react";
import SearchPage from 'domains/product/Search'

const QueryFixedSearchPage = (props)=>(
  <SearchPage {...{
    ...props,
    isWishlist:true
  }} />
)


// export default Search;
export default QueryFixedSearchPage;
