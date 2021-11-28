import { API_KEY } from "./config";
import { useQuery } from "react-query";

function App() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(API_KEY).then((res) => {
      return res.json();
    })
  );

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    console.error(error);
    return "Error";
  }

  console.log({ data });

  return <div className="App">Admin UI</div>;
}

export default App;
