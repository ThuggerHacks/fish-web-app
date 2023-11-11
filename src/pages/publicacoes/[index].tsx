import { useEffect, useRef, useState } from "react";
import MetaTags from "../../components/metatags/metatags";
import ScriptComponents from "../../components/scripts/scripts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Navbar from "../../components/navbar/navbar";

export default function Post() {
  const [data, setData]: any = useState({});
  const router: any = useRouter();

  const getPost = async (id: any) => {
    if (id) {
      const post = await axios.get("/api/post/?id=" + id);

      if (post.data) {
        setData(post.data);
      }
    }
  };

  useEffect(() => {
    const ll = localStorage.getItem("user");

    if (!ll) {
      Router.push("/login");
    }

    (async () => {
      await getPost(router.query.index);
    })();
  }, [data.length != 0 && router.isReady]);

  return (
    <>
      <ToastContainer />
      <MetaTags />
      <Navbar active={"pb"} />
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="true"
        data-bs-interval="5000"
      >
        <div className="carousel-inner" style={{overflow:"hidden"}}>
          <div className="carousel-item active" style={{backgroundImage:`url(${data.file})`,backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed",width:"100%",height:"100vh",top:0,left:0,overflow:"hidden",paddingBottom:-100}}>
            <div className="carousel-caption0">
              <br /><h2>{data.title}</h2>
              <small>{data?.createdAt?.split("T")[0]}</small>
              <p style={{textAlign:"justify"}}>
              {data.content} <br />
              </p>
            </div>
          </div>
        </div>
        <div className="cover"></div>
      </div>
      <ScriptComponents />
    </>
  );
}
