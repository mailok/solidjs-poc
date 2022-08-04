import { JSX } from 'solid-js/types/jsx';
import User from '../utils/user';

type Variant = 'outline' | 'filled';

function FetchButton(props: { class?: string; variant?: Variant; children?: JSX.Element }) {
  const { fetch } = User.useQuery();

  const variants: Record<Variant, string> = {
    outline:
      'p-2 pl-5 pr-5 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300',
    filled: 'p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300',
  };

  return (
    <div class="text-center p-2">
      <button onClick={fetch} class={variants[props.variant || 'outline']}>
        {props.children}
      </button>
    </div>
  );
}

export default FetchButton;
