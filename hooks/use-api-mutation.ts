import { useMutation } from 'convex/react';
import { FunctionReference, OptionalRestArgs } from 'convex/server';
import { useState } from 'react';

interface UseApiMutationProps<Mutation extends FunctionReference<'mutation'>> {
  mutationFn: Mutation;
}

export const useApiMutation = <Mutation extends FunctionReference<'mutation'>>({
  mutationFn,
}: UseApiMutationProps<Mutation>) => {
  const [isPending, setIsPending] = useState(false);
  const apiMutation = useMutation(mutationFn);

  const mutate = (...args: OptionalRestArgs<Mutation>) => {
    setIsPending(true);
    return apiMutation(...args)
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error;
      })
      .finally(() => setIsPending(false));
  };

  return {
    mutate,
    isPending,
  };
};
