const Header = () => {
 return (
  <div
  id="carouselExample"
  className="carousel slide"
  data-bs-ride="true"
  data-bs-interval="5000"
>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img
        src="https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="d-block w-100"
        alt="..."
      />
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img
        src="https://images.pexels.com/photos/1145274/pexels-photo-1145274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="d-block w-100"
        alt="..."
      />
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img
        src="https://images.pexels.com/photos/2109800/pexels-photo-2109800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="d-block w-100"
        alt="..."
      />
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
  <div className="cover"></div>
</div>
 );
};

export default Header;
