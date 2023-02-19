import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleComponent = () => {
  const slug = useParams();
  const props = slug.slug
  console.log("props" + props);

  const [blog, setBlog] = useState("");

  useEffect(() => {
 const  fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/blog/${props}`
        );
        setBlog(response);
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  }, []);
  return <div>The content is {JSON.stringify(blog)}</div>;
  
};

export default SingleComponent;
