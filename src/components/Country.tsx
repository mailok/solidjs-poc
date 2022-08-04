import User from '../utils/user';

function Country() {
  const { query } = User.useQuery();
  return (
    <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
      <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
      {query.data.location}
    </div>
  );
}

export default Country;
