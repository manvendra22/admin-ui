import { API_KEY } from "./config";
import { useQuery } from "react-query";

import Table from "./Components/Table/Table";

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

  return (
    <div class="container mx-auto p-4">
      <Table data={data} />
    </div>
  );
}

export default App;
