import User from '../utils/user';
import { Show } from 'solid-js';

function Avatar() {
  const { query } = User.useQuery();

  return (
    <div class="relative">
      <Show
        when={query.isDataAvailable}
        fallback={
          <div class="animate-pulse align-middle border-none absolute -m-16 -ml-16 lg:-ml-16">
            <div class="rounded-full bg-slate-200 h-32 w-32" />
          </div>
        }
      >
        <img
          src={query.data.avatar}
          class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-16 lg:-ml-16 max-w-[150px]"
          alt="profile-image"
        />
      </Show>
    </div>
  );
}

export default Avatar;
