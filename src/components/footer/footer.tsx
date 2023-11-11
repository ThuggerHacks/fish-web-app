const Footer = () => {
  return (
    <footer id="footer" className="footer-1">
      <div className="main-footer widgets-dark typo-light">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget subscribe no-box">
                <h5 className="widget-title">
                  NOME DA EMPRESA
                  <span />
                </h5>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                 Links
                  <span />
                </h5>
                <ul className="thumbnail-widget">
                  <li>
                    <div className="thumb-content">
                      <a href="#.">&nbsp;Comece agora</a>
                    </div>
                  </li>
                  <li>
                    <div className="thumb-content">
                      <a href="#.">&nbsp;Lideres</a>
                    </div>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Siga-nos
                  <span />
                </h5>
                <a href="#">
                  {" "}
                  <i className="fa fa-facebook"> </i>{" "}
                </a>
                <a href="#">
                  {" "}
                  <i className="fa fa-twitter"> </i>{" "}
                </a>
                <a href="#">
                  {" "}
                  <i className="fa fa-youtube"> </i>{" "}
                </a>
              </div>
            </div>
            <br />
            <br />
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Contacte-nos
                  <span />
                </h5>
                <p>
                    +258 840000000 <br />
                    email@gmail.com
                </p>
                <div className="emailfield">
                  <input type="text" name="email"  className="input" defaultValue="Email" />
                  <input name="uri" type="hidden" defaultValue="arabiantheme" />
                  <input name="loc" type="hidden" defaultValue="en_US" />
                  <input
                    className="submitbutton ripplelink"
                    type="submit"
                    defaultValue="Subscribe"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <p>
                  Copyright {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
