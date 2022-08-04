import type { Component } from 'solid-js';
import UserCard from './components/UserCard';
import Header from './components/Header';
import Avatar from './components/Avatar';
import Details from './components/Details';
import Country from './components/Country';
import Name from './components/Name';
import Statistics from './components/Statistics';
import Bio from './components/Bio';
import FetchButton from './components/FetchButton';

const App: Component = () => {
  return (
    <UserCard>
      <Header>
        <Avatar />
      </Header>
      <Statistics />
      <Details>
        <Name />
        <Country />
      </Details>
      <Bio />
      <FetchButton variant={'outline'}>Fetch User</FetchButton>
    </UserCard>
  );
};

export default App;
