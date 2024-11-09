import { useEffect } from "react";
import CardTask from "../module/CardTask";
import { callapi } from "../../libs/helpers/callApi";

function Homepage() {
  useEffect(() => {
    const todos = async () => {
      const res = await callapi().get("/todos");
      console.log(res);
    };
    todos();
  }, []);
  return (
    <div className=" container max-w-7xl  mx-auto p-10 ">
      <CardTask />
    </div>
  );
}

export default Homepage;
