import { useEffect, useState } from "react";
import MetaTags from "../../components/metatags/metatags";
import ScriptComponents from "../../components/scripts/scripts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router from "next/router";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

export default function Periodo() {
  const [endDate, setEndDate]: any = useState("");
  const [startDate, setStartDate]: any = useState("");
  const [data, setData]: any = useState([]);
  const[allowed,setAllowed]:any = useState(false);
  const[admin,isAdmin]:any = useState(false);

  const getPeriodo = async () => {
    const period = await axios.get("/api/period");

    if (period.data) {
      setData(period.data);
    }
    
  };

  const addPeriodo = async () => {
    if(startDate.trim() == "" || endDate.trim() == ""){
        return toast.error("Por favor preencha todos os dados")
    }

    const period = await axios.post("/api/period", {
        startDate,
        endDate,
        allowed

    });

    if (period.data) {
      setStartDate("");
      setEndDate("");
      await getPeriodo();
    }else{
        return toast.error("Houve um erro")
    }
  };

  const deletePeriod = async(id:any) => {

    const c = confirm("Quer mesmo apagar este periodo ?");

    if(c){
         const period = await axios.delete("/api/period/?id="+parseInt(id));

        if(period.data){
            await getPeriodo();
        }else{
            return toast.error("Houve um erro");
        }
    }
   
  }


  useEffect(() => {

    (async () => {
      await getPeriodo();
    })();

    const bb:any = localStorage.getItem("user");
    const aa = JSON.parse(bb);

    isAdmin(aa?.data?.admin == true?true:false)
  }, [data.length != 0]);

  return (
    <>
      <ToastContainer />
      <MetaTags />
      <Navbar active={"p"} />
      <main>
        <div className="container my-3">
        {
          admin?
          <button
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa-solid fa-plus"></i>
        </button>:""
        }
          <br />
          <div className="table-responsive my-2">
            <table className="table table-hover border-striped">
              <thead>
                <tr>
                  <th>Inicio</th>
                  <th>Fim</th>
                  <th>Permitido?</th>
                 {
                  admin?
                  <th>#</th>:""
                 }
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.allowed == true?"Sim":"Nao"}</td>
                      {
                        admin?
                        <td>
                        <button className="btn btn-danger" onClick={() => deletePeriod(item.id)}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>:""
                      }
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* <Footer/> */}
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
                  Novo Periodo
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
                    type="date"
                    name=""
                    value={startDate}
                    onChange={(evt) => setStartDate(evt.target.value)}
                    className="form-control p-3"
                    id="pass"
                  />
                </div>{" "}
                <br />
                <div className="form-group ">
                  <input
                    type="date"
                    name=""
                    onChange={(evt) => setEndDate(evt.target.value)}
                    className="form-control p-3"
                    id="email"
                    value={endDate}
                  />
                </div>{" "}
                <br />
                <div className="form-group">
                  <select
                    name=""
                    className="form-control p-3"
                    onChange={(evt) =>
                      setAllowed(evt.target.value == "1" ? true : false)
                    }
                    id=""
                  >
                    <option value="">Permitido?</option>
                    <option value="0">N&atilde;o</option>
                    <option value="1">Sim</option>
                  </select>
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
                <button
                  onClick={addPeriodo}
                  type="button"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
