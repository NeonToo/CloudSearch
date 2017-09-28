/**
 * Created by I326950 on 3/14/2017.
 */
export default {
    setSearchType (state, newSearchType) {
        state.searchType = newSearchType;
    },
    setKey (state, newKey) {
        state.key = newKey;
    },
    submitSearchForm(state, newSearch) {
        state.searchType = newSearch.searchType;
        state.key = newSearch.key;
    }
}