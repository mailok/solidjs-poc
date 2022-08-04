import User from '../utils/user';

function Name() {
  const { query } = User.useQuery();
  return (
    <h3 class="text-[length:var(--size-user-name)] text-[color:var(--color-user-name)] font-bold leading-normal mb-1">
      {query.data.name}
    </h3>
  );
}

export default Name;
