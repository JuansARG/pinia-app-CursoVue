<script setup lang="ts">
import type { Client } from '@/clients/interfaces/client';


const props = defineProps<{
    clients: Client[]
}>();

</script>
<template>
    <ul>
        <li 
            v-for="{ id, name } of props.clients"
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