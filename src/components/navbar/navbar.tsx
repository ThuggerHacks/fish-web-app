import Router from "next/router";
import { useEffect, useRef, useState } from "react";


const Navbar = (props:any) => {
  const[admin,isAdmin]:any = useState(false);
  const[worker,setWorker]:any = useState(false)
  const navbar:any = useRef();

  const scrollPage = () => {
      if(typeof window !='undefined' && props.home){
        window.onscroll = () => {
          let top = window.scrollY;
          if(top >= 100){
            navbar?.current?.classList?.add("bg-dark");
          }else{
            navbar?.current?.classList?.remove("bg-dark");
          }
        }
      }
  }

  useEffect(() => {
    const bb:any = localStorage.getItem("user");
    const aa = JSON.parse(bb);
    scrollPage()
    setWorker(bb?true:false)
    isAdmin(aa?.data?.admin == true?true:false)
  },[]);


  const logout = () => {
    localStorage.clear();
    Router.push("/login");
  }

    return (
        <nav ref={navbar} className={props.home?"navbar navbar-expand-lg fixed-top  navbar-dark":"navbar navbar-expand-lg sticky-top bg-dark navbar-dark"}>
        <div className="container">
          <a className="navbar-brand"  href="/">
            <i className="fa-solid fa-fish-fins fa-10x"></i>
            <strong>Fish<span className="text-primary">mar</span></strong>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse"  style={{justifyContent:"flex-end"}} id="navbarSupportedContent">
            {
              admin || worker?
              <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={props.active == "f"?"nav-link active":"nav-link "}  href="/admin">
                    <i className="fa-solid fa-users"></i> &nbsp;
                    Funcionarios
                </a>
              </li>
              <li className="nav-item">
                <a className={props.active == "pb"?"nav-link active":"nav-link "}  href="/publicacoes">
                    <i className="fa-solid fa-comments"></i> &nbsp;
                    Publica&ccedil;&otilde;es
                </a>
              </li>
              <li className="nav-item">
                <a className={props.active == "p"?"nav-link active":"nav-link "}  href="/periodo">
                    <i className="fa-solid fa-clock"></i> &nbsp;
                    Periodos
                </a>
              </li>
              {/* <li className="nav-item">
                <a className={props.active == "r"?"nav-link active":"nav-link "}  href="/relatorio">
                    <i className="fa-solid fa-receipt"></i> &nbsp;
                    Relatiorio
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i> &nbsp;
                    Sair
                </a>
              </li>
            </ul>:
             <ul className="navbar-nav  mb-2 mb-lg-0">
               <li className="nav-item">
                <a className={props.active == "p"?"nav-link active":"nav-link "}  href="/periodo">
                    <i className="fa-solid fa-clock"></i> &nbsp;
                    Periodos
                </a>
              </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link">
                    <i className="fa-solid fa-user"></i> &nbsp;
                    Login
                  </a>
                </li>
             </ul>
            }
          </div>
        </div>
      </nav>
    );
}

export default Navbar;