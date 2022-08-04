import Random, { User } from './random';
import { createStore } from 'solid-js/store';

const [query, setQuery] = createStore({
  data: null as User | null,
  isLoading: false,
  error: null,
  get isDataAvailable(): boolean {
    return !this.isLoading && Boolean(this.data);
  },
});

function useQuery() {
  async function fetch() {
    if (!query.isLoading) {
      setQuery({ data: null, isLoading: true, error: false });
      try {
        const user = await Random.user();
        setQuery({ data: user });
      } catch (err) {
        setQuery({ error: true });
      } finally {
        setQuery({ isLoading: false });
      }
    }
  }

  return { query, fetch };
}

export default { useQuery };
