import axios from "axios";

import { ref, onMounted } from "vue";

export function useCardData(productsType) {
  const productsDataArray = ref([]);

  const fetching = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/${productsType}`);
      productsDataArray.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(fetching);

  return { productsDataArray };
}
