import request from '@/utils/request';
import { useEffect, useState, DependencyList } from 'react';

type UseQueryOptions = {
  options?: RequestInit;
  deps?: DependencyList;
};

type UseQueryResult<SuccessResponse> = {
  data: SuccessResponse | null;
  error: Error | null;
  isLoading: boolean;
};

function useQuery<SuccessResponse>(
  url: string,
  { options, deps = [] }: UseQueryOptions = {},
): UseQueryResult<SuccessResponse> {
  const [data, setData] = useState<SuccessResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await request.get<SuccessResponse>(url, { ...options, signal });
        setData(result);
      } catch (error) {
        const err = error as Error;
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, options, ...deps]);

  return { data, error, isLoading };
}

export default useQuery;
