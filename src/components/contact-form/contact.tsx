

const ContactForm = () => {

    return (
        <div className="container contact-form">
        <form method="post">
          <h3>Envie-nos uma mensagem</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" name="txtName" className="form-control input" placeholder="Seu Nome *"  />
              </div>
              <div className="form-group">
                <input type="text" name="txtEmail" className="form-control input" placeholder="Seu Email *"  />
              </div>
              <div className="form-group">
                <input type="text" name="txtPhone" className="form-control input" placeholder="Seu Numero de celular *"  />
              </div>
              <div className="form-group">
                <input type="submit" name="btnSubmit" className="btnContact" value="Enviar" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <textarea name="txtMsg" className="form-control" placeholder="Sua Mensagem *" style={{width: '100%', height: '150px'}} />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
}

export default ContactForm;