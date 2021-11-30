import { API_KEY } from "./config";
import { useQuery } from "react-query";

import Table from "./Components/Table";

const App = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(API_KEY).then((res) => {
      return res.json();
    })
  );

  if (isLoading) {
    return (
      <div class="flex justify-center items-center h-screen">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500
    "
        ></div>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <Table data={data} />
    </div>
  );
};

export default App;
