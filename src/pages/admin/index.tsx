import { useEffect, useState } from "react";
import MetaTags from "../../components/metatags/metatags";
import ScriptComponents from "../../components/scripts/scripts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router from "next/router";
import Navbar from "../../components/navbar/navbar";

export default function Admin() {
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [name, setName]: any = useState("");
  const [admin, setAdmin]: any = useState(false);
  const [data, setData]: any = useState([]);
  const[admin2,isAdmin]:any = useState(false);

  const getEmployees = async () => {
    const employees = await axios.get("/api/user");

    if (employees.data) {
      setData(employees.data);
    }
  };

  const addEmployee = async () => {
    if(email.trim() == "" || password.trim() == ""){
        return toast.error("Senha e email nao podem estar vazios")
    }

    const employee = await axios.post("/api/user", {
      email,
      password,
      admin,
      name,
    });

    if (employee.data) {
      setName("");
      setEmail("");
      setAdmin(false);
      setPassword("");
      await getEmployees();
    }else{
        return toast.error("Houve um erro")
    }
  };

  const deleteEmployee = async(id:any) => {

    const c = confirm("Quer mesmo apagar este funcionario ?");

    if(c){
         const employee = await axios.delete("/api/user/?id="+parseInt(id));

        if(employee.data){
            await getEmployees();
        }else{
            return toast.error("Houve um erro");
        }
    }
   
  }


  useEffect(() => {
    const ll = localStorage.getItem("user");

    if (!ll) {
      Router.push("/login");
    }

    (async () => {
      await getEmployees();
    })();

    const bb:any = localStorage.getItem("user");
    const aa = JSON.parse(bb);

    isAdmin(aa?.data?.admin == true?true:false)
  }, [data.length != 0]);

  return (
    <>
      <ToastContainer />
      <MetaTags />
      <Navbar active={"f"} />
      <main>
        <div className="container my-3">
          {
            admin2?
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Codigo do funcionario</th>
                  <th>Nome do funcionario</th>
                  <th>Email do funcionario</th>
                  <th>Admin</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.admin == true?"Sim":"Nao"}</td>
                      {
                        admin2?
                        <td>
                        <button className="btn btn-danger" onClick={() => deleteEmployee(item.id)}>
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
                  Novo funcionario
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
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    className="form-control p-3"
                    id="pass"
                    placeholder="Nome"
                  />
                </div>{" "}
                <br />
                <div className="form-group ">
                  <input
                    type="email"
                    name=""
                    onChange={(evt) => setEmail(evt.target.value)}
                    className="form-control p-3"
                    id="email"
                    value={email}
                    placeholder="Email"
                  />
                </div>{" "}
                <br />
                <div className="form-group">
                  <input
                    type="email"
                    name=""
                    onChange={(evt) => setPassword(evt.target.value)}
                    className="form-control p-3"
                    id="pass"
                    placeholder="Senha"
                    value={password}
                  />
                </div>{" "}
                <br />
                <div className="form-group">
                  <select
                    name=""
                    className="form-control p-3"
                    onChange={(evt) =>
                      setAdmin(evt.target.value == "1" ? true : false)
                    }
                    id=""
                  >
                    <option value="">Admin</option>
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
                  onClick={addEmployee}
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
