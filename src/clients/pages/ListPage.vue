<script setup lang="ts">
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumbers from '@/clients/components/PaginationNumbers.vue';
import useClients from '@/clients/composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const {
    clients,
    currentPage,
    getPage,
    isLoading,
    totalPages
} = useClients();

</script>
<template>
    <div>
        <h1>Listado de clientes...</h1>
        <!-- Client List -->
        <ClientList :clients="clients" />

        <!-- Pagination Numbers -->
        <PaginationNumbers 
            :current-page="currentPage" 
            :total-pages="totalPages"
            @page-change="(page) => getPage(page)"
        />

        <!-- LoadingModal -->
        <LoadingModal v-if="isLoading" />
    </div>
</template>
<style scoped></style>