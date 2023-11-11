import { useEffect, useState } from "react";
import MetaTags from "../components/metatags/metatags";
import ScriptComponents from "../components/scripts/scripts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router from "next/router";
import Navbar from "../components/navbar/navbar";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import ContactForm from "../components/contact-form/contact";

export default function PostClient() {
  const [data, setData]: any = useState([]);

  const getPost = async () => {
    const post = await axios.get("/api/post");

    if (post.data) {
      setData(post.data);
    }
  };

  const details = (id: any) => {
    Router.push("/publicacoes/" + id);
  };

  useEffect(() => {
    (async () => {
      await getPost();
    })();
  }, [data.length != 0]);

  return (
    <>
      <ToastContainer />
      <MetaTags />
      <Navbar active={"pb"} home={true} />
      <main>
        <Header />
        <div className="container my-2">
          <br />
          <div className="row">
            {data?.map((item: any) => {
              return (
                <div className="col-md-6">
                  <div className="card flex-md-row mb-4 shadow-sm h-md-250">
                    <div className="card-body d-flex flex-column align-items-start">
                      <strong className="d-inline-block mb-2 text-primary">
                        {item.title}
                      </strong>
                      <h6 className="mb-0">
                        <a className="text-dark" href="#">
                          {" "}
                          {item.content?.substring(0, 90)}...
                        </a>
                      </h6>
                      <div className="mb-1 text-muted small">
                        {item?.createdAt?.split("T")[0]}
                      </div>
                      <p className="card-text mb-auto">
                        {" "}
                        {item.content?.substring(90, 300)}...
                      </p>
                      <a
                        className="btn btn-outline-primary btn-sm"
                        role="button"
                       onClick={() => details(item.id)}
                      >
                        Continuar lendo
                      </a>
                    </div>
                    <img
                      className="card-img-right img flex-auto d-none d-lg-block"
                      alt="Thumbnail [200x250]"
                      src={item.file}
                      style={{ width: "200px", height: "250px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <ContactForm/>
      <Footer />
      <ScriptComponents />
    </>
  );
}
