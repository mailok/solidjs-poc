import User from '../utils/user';
import { Show } from 'solid-js';

function Statistics() {
  const { query } = User.useQuery();
  return (
    <div class="w-full text-center">
      <div class="flex justify-center lg:pt-4 pt-8 pb-0">
        <div class="p-3 text-center flex flex-col justify-center items-center">
          <Show
            when={query.isDataAvailable}
            fallback={<div class="animate-pulse flex h-7 w-12 bg-slate-200 rounded" />}
          >
            <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{query.data.photos}</span>
            <span class="text-sm text-slate-400">Photos</span>
          </Show>
        </div>
        <div class="p-3 text-center flex flex-col justify-center items-center">
          <Show
            when={query.isDataAvailable}
            fallback={<div class="animate-pulse flex h-7 w-12 bg-slate-200 rounded" />}
          >
            <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{query.data.followers}</span>
            <span class="text-sm text-slate-400">Followers</span>
          </Show>
        </div>

        <div class="p-3 text-center flex flex-col justify-center items-center">
          <Show
            when={query.isDataAvailable}
            fallback={<div class="animate-pulse flex h-7 w-12 bg-slate-200 rounded" />}
          >
            <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{query.data.following}</span>
            <span class="text-sm text-slate-400">Following</span>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
