/**
 * Created by I326950 on 3/14/2017.
 */
export default {
    setSearchType (state, newSearchType) {
        state.searchType = newSearchType;
    },
    setKeyword (state, newKeyword) {
        state.keyword = newKeyword;
    },
    submitSearchForm(state, newSearch) {
        state.searchType = newSearch.searchType;
        state.keyword = newSearch.keyword;
    }
}