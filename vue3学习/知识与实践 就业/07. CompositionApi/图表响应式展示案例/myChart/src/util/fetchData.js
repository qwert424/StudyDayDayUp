import { ref } from "vue";
import { getData } from "../apis/getData";
const valueDataRef = ref([]);
async function fetchData() {
    valueDataRef.value = await getData("/api/gdp.json");
}
fetchData();
export default { valueData: valueDataRef }