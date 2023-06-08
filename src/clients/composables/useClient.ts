import { computed, ref, watch } from "vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";



// const queryClient = useQueryClient();

const getClient = async (id: number): Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${id}`);
    return data;
};

const updateClient = async( client: Client ): Promise<Client> => {
    const { data } = await clientsApi.patch<Client>(`/clients/${ client.id }`, client);
    // const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false});
    // queries.forEach( query => query.reset());
    // queries.forEach( query => query.fetch());
    return data;
}

const useClient = (id: number) => {
    const client = ref<Client>();

    const { data, isLoading, isError } = useQuery(
        ["client", id], 
        () => getClient(id),
        {
            // retry: false, // reintentar peticion
            // retryDelay: 1000 * 20, // intervalo para reintentar peticion
            // staleTime: 1000 * 60 // tiempo que duran en el cache antes que se dispare otra peticion
        }
    );

    const clientMutation = useMutation( updateClient );

    watch( data, () => {
            if (data.value) client.value = { ...data.value };
        }, { immediate: true }
    );

    watch( clientMutation.isSuccess, () => {
        setTimeout(() => {
            clientMutation.reset();
        }, 1500);
    });

    return {
        client,
        // clientMutation,
        isError,
        isLoading,

        // Method
        updateClient: clientMutation.mutate,
        isUpdating: computed(() => clientMutation.isLoading.value),
        isUpdatingSuccess: computed(() => clientMutation.isSuccess.value),
        isErrorUpdating: computed(() => clientMutation.isError.value),
    };
};

export default useClient;
