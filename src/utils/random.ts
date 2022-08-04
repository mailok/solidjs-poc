export type User = {
  name: string;
  avatar: string;
  location: string;
  photos: number;
  followers: number;
  following: number;
};

function number(min = 100, max = 5000) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function user(): Promise<User | null> {
  const userData = await fetch(
    "https://randomuser.me/api/?inc=name,picture,location"
  ).then((response) => response.json());

  if (
    userData &&
    userData.results &&
    Array.isArray(userData.results) &&
    userData.results.length >= 1
  ) {
    const userResponse = userData.results[0];
    return {
      name: `${userResponse.name.first} ${userResponse.name.last}`,
      avatar: userResponse.picture.large,
      location: `${userResponse.location.state}, ${userResponse.location.country}`,
      photos: number(5, 200),
      followers: number(),
      following: number(),
    };
  }

  return null;
}

export default { user, number };
