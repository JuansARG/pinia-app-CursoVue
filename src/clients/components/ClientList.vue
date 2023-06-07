<script setup lang="ts">
import { RouterLink } from 'vue-router';
import useClients from '../composables/useClients';

const { clients } = useClients();

</script>
<template>
    <ul>
        <li 
            v-for="{ id, name } of clients"
            :key="id"
            >
            <RouterLink
                :to="{
                    name: 'client-id',
                    params: { id: id }
            }">
                {{ name }}
            </RouterLink>
        </li>
    </ul>
</template>
<style scoped></style>