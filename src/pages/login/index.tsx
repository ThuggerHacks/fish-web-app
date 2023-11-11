import { useState } from 'react'
import MetaTags from '../../components/metatags/metatags'
import ScriptComponents from '../../components/scripts/scripts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Router from 'next/router';

export default function Login() {
  const [email,setEmail]:any = useState("");
  const [password, setPassword]:any = useState("");

  const Login = async() =>{

    if(email.trim() == "" || password.trim() == ""){
      return toast.error("Por favor preencha todos os dados");
    }else{
      const userLogin = await axios.post("/api/user",{
        login:true,
        password,
        email
      });

      if(userLogin.data == null){
        return toast.error("Dados incorrectos");
      }
      
      localStorage.setItem("user",JSON.stringify(userLogin));
      Router.push("/admin");
    }
  }

  return (
    <>
    <ToastContainer/>
      <MetaTags/>
      <main>
        <div className="container">
          <div className="login">
            <div className="card">
              <div className="card-header bg-dark">
                <h2 className='text-light text-center'>LOGIN</h2>
              </div>
              <div className="card-body login-card">
                  <div className="form-group mb-3">
                    <input type="email" name="" onChange={evt => setEmail(evt.target.value)} className='form-control p-3' id="email"  placeholder='Seu email' />
                  </div>
                  <div className="form-group">
                    <input type="email" name="" onChange={evt => setPassword(evt.target.value)} className='form-control p-3' id="pass"  placeholder='Sua senha' />
                  </div> <br />
                  <div className="form-group">
                    <button className="btn btn-dark p-3" onClick={Login}>Entrar</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ScriptComponents/>
    </>
  )
}
