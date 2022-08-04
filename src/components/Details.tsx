import { Show } from 'solid-js';
import { JSX } from 'solid-js/types/jsx';
import User from '../utils/user';

function Details(props: { class?: string; children?: JSX.Element }) {
  const { query } = User.useQuery();

  return (
    <Show
      when={query.isDataAvailable}
      fallback={
        <div class="mt-2 flex flex-col gap-1 items-center justify-center">
          <div class="animate-pulse flex h-10 w-44 bg-slate-200 rounded" />
          <div class="animate-pulse flex h-4 w-44 bg-slate-200 rounded" />
        </div>
      }
    >
      <div class="text-center mt-2">{props.children}</div>
    </Show>
  );
}

export default Details;
