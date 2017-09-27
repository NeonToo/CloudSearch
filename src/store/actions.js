/**
 * Created by I326950 on 3/21/2017.
 */
export default {
    setSearchType({state, commit}) {
        commit("setSearchType", state.searchType);
    },
    setKey({state, commit}) {
        commit("setKey", state.key);
    }
}
