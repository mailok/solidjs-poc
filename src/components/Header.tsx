import { JSX } from 'solid-js/types/jsx';

function Header(props: { class?: string; children?: JSX.Element }) {
  return (
    <div class="min-h-[4rem] flex flex-wrap justify-center">
      <div class="w-full min-w-full flex justify-center">{props.children}</div>
    </div>
  );
}

export default Header;
