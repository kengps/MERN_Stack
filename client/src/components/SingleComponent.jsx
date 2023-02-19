import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleComponent = () => {
  const slug = useParams();
  const props = slug.slug
  console.log("props" + props);

  const [blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API}/blog/${props}`)
      .then((response) => {
        setBlog(response);
        console.log("respone =", response);
        console.log("respone 2=", response.data.title);
        console.log("respone 3=", response.data.content);
   
      })
      .catch((err) => alert(err));
  }, []);
  return <div>The content is {JSON.stringify(blog)}</div>;
  
};

export default SingleComponent;
