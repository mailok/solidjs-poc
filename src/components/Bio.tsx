import User from '../utils/user';
import { Show } from 'solid-js';
import { JSX } from 'solid-js/types/jsx';

function Bio(props: { class?: string; children?: JSX.Element }) {
  const { query } = User.useQuery();
  return (
    <div class="py-6 border-t border-slate-200 text-center">
      <div class="flex flex-wrap justify-center">
        <Show
          when={query.isDataAvailable}
          fallback={<div class="animate-pulse flex w-full px-4 h-20 bg-slate-200 rounded" />}
        >
          <div class="w-full px-4">
            <p class="font-light leading-relaxed text-slate-600 mb-4">
              An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy
              writes, performs and records all of his own music, giving it a warm.
            </p>
            {props.children}
          </div>
        </Show>
      </div>
    </div>
  );
}

export default Bio;
