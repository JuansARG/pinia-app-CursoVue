<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useClient from '../composables/useClient';
import LoadingModal from '@/shared/components/LoadingModal.vue';



const route = useRoute();
const router = useRouter();

const { 
    client,
    isError,
    isLoading,
    isUpdating,
    isUpdatingSuccess,
    updateClient,
 } = useClient( +route.params.id );

watch( isError, () => {
    if ( isError.value ) router.replace('/clients');
});

</script>
<template>
    <div>
        <h3 v-if="isUpdating" >Guardando...</h3>
        <h3 v-if="isUpdatingSuccess" >Guardando!</h3>

        <LoadingModal v-if="isLoading"/>

        <div v-if="client">
            <h1>{{ client.name }}</h1>
            <form @submit.prevent="updateClient(client!)">
                <input 
                    type="text"
                    placeholder="Nombre del cliente"
                    v-model="client.name"
                />
                <br>
                <input 
                    type="text"
                    placeholder="Direccion"
                    v-model="client.address"
                />
                <br>
                <button 
                    type="submit"
                    :disabled="isUpdating"
                    >Guardar</button>
            </form>
        </div>

        <code>{{ client }}</code>

    </div>
</template>
<style scoped>
input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}

button {
    margin-bottom: 10px;
    padding: 5px 10px;
}
</style>