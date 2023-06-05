import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.users);

  return (
    <div>{user.name}</div>
  )
}

export default Home