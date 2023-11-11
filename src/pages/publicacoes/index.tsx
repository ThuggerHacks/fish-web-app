import { useEffect, useRef, useState } from "react";
import MetaTags from "../../components/metatags/metatags";
import ScriptComponents from "../../components/scripts/scripts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router from "next/router";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const fileUpload = async (formDataFile1: any) => {
  try {
    const response: any = await axios.post(
      "https://savanapoint-upload-files-api.herokuapp.com/api/savanapoint-upload-files",
      formDataFile1,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.url_file;
  } catch (error) {
    return null;
  }
};

export default function Post() {
  const [title, setTitle]: any = useState("");
  const [content, setContent]: any = useState("");
  const [file, setFile]: any = useState("");
  const fileData: any = useRef({});
  const [data, setData]: any = useState([]);
  const [loading, setLoading]: any = useState(false);

  const getPost = async () => {
    const post = await axios.get("/api/post");

    if (post.data) {
      setData(post.data);
    }
  };

  const addPost = async () => {
    setLoading(true);
    if (title.trim() == "" || content.trim() == "") {
      setLoading(false);
      return toast.error("Por favor preencha todos os dados");
    }

    var filee = "";
    const formDataFile1 = new FormData();
    if (fileData.current.files[0]) {
      formDataFile1.append(
        "file",
        fileData.current.files[0],
        fileData?.current.files[0].name
      );
      filee = await fileUpload(formDataFile1);
      console.log(filee);
      setFile(filee);
    }

    const post = await axios.post("/api/post", {
      title,
      content,
      file: filee,
    });

    if (post.data) {
      setTitle("");
      setContent("");
      setFile("");
      setLoading(false);
      await getPost();
    } else {
      setLoading(false);
      return toast.error("Houve um erro");
    }
  };

  const deletePost = async (id: any) => {
    const c = confirm("Quer mesmo apagar este post ?");

    if (c) {
      const period = await axios.delete("/api/post/?id=" + parseInt(id));

      if (period.data) {
        await getPost();
      } else {
        return toast.error("Houve um erro");
      }
    }
  };

  const details = (id: any) => {
    Router.push("/publicacoes/" + id);
  };

  useEffect(() => {
    const ll = localStorage.getItem("user");

    if (!ll) {
      Router.push("/login");
    }

    (async () => {
      await getPost();
    })();
  }, [data.length != 0]);

  return (
    <>
      <ToastContainer />
      <MetaTags />
      <Navbar active={"pb"} home={false} />
      <main>
        <div className="container my-3">
          <button
            className="btn btn-dark my-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa-solid fa-plus"></i>
          </button>{" "}
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

                        <a className="card-footer bg-light">
                        <button
                          className="btn btn-danger"
                          onClick={() => deletePost(item.id)}
                          style={{ float: "right" }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </a>
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

      <Footer />
      <ScriptComponents />

      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Novo Post
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="text"
                    name=""
                    value={title}
                    onChange={(evt) => setTitle(evt.target.value)}
                    className="form-control p-3"
                    placeholder="Titulo"
                    id="pass"
                  />
                </div>{" "}
                <br />
                <div className="form-group ">
                  <input
                    type="file"
                    name=""
                    className="form-control p-3"
                    id="email"
                    ref={fileData}
                  />
                </div>{" "}
                <br />
                <div className="form-group">
                  <textarea
                    name=""
                    onChange={(evt) => setContent(evt.target.value)}
                    className="form-control"
                    placeholder="Conteudo"
                    id=""
                  ></textarea>
                </div>{" "}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                {loading ? (
                  <button type="button" className="btn btn-primary">
                    Guardando...
                  </button>
                ) : (
                  <button
                    onClick={addPost}
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Guardar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
