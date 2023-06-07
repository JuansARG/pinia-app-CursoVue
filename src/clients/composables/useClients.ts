import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from '../../store/clients';
import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";



const getClients = async(): Promise<Client[]> => {
    const { data } = await clientsApi.get<Client[]>('/clients?_page=1');
    return data;
};

const useClients = () => {

    const store = useClientsStore();
    const { clients: clientList } = storeToRefs(store);
    
    const { isLoading, data } = useQuery(
        ['clients?page=', 1],
        () => getClients(),
    );

    watch( data, clients => {
        if( clients )
            store.setClients(clients);
    });

    return {
        isLoading,
        clients: clientList,
    }
};

export default useClients;