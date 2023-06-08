<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';

interface Props {
    currentPage: number,
    totalPages: number
}

const props = defineProps<Props>();
const { currentPage, totalPages } = toRefs(props);

interface Emits {
    (e: 'pageChange', page: number): void;
}

const emits = defineEmits<Emits>();

const totalPageNumbers = ref<number[]>([]);

watch( totalPages, () => {
    totalPageNumbers.value = [...new Array(totalPages.value)].map((v, i) => i + 1)
}, { immediate: true });


</script>
<template>
    <div>
        <button
            :disabled="currentPage === 1"
            @click="emits('pageChange', currentPage - 1)">
            Anterior
        </button>

        <button 
            v-for="page of totalPageNumbers"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="emits('pageChange', page)"
            >{{ page }}
        </button>

        <button
            :disabled="currentPage === totalPages"
            @click="emits('pageChange', currentPage + 1)">
            Siguiente
        </button>
    </div>
</template>
<style scoped>
div {
    margin-top: 10px;
}

button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    cursor: pointer;
    padding: 10px;
    transition: all .5s;
}

button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: all .5s;
}

button:disabled {
    cursor: not-allowed;
}

.active {
    background-color: hsla(160, 100%, 37%, 0.2);
}
</style>