import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from '../../store/clients';
import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";



const getClients = async( page: number ): Promise<Client[]> => {
    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);
    return data;
};

const useClients = () => {

    const store = useClientsStore();
    const { clients, currentPage, totalPages } = storeToRefs(store);
    
    const { isLoading, data } = useQuery(
        ['clients?page=', currentPage],
        () => getClients( currentPage.value ),
    );

    watch( data, clients => {
        if( clients )
            store.setClients(clients);
    }, { immediate: true });

    return {
        // Properties
        clients,
        currentPage,
        isLoading,
        totalPages,

        // Methods
        getPage( page: number ){
            store.setPage( page );
        },

        // Getters
    }
};

export default useClients;