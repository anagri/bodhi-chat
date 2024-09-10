import { useQuery as useReactQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';

export function useQuery<T>(
  key: string | readonly unknown[],
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T, AxiosError>
) {
  return useReactQuery<T, AxiosError>(key, queryFn, options);
}
