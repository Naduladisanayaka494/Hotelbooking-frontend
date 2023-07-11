function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  console.log(user?.data?.name); // Use optional chaining to avoid errors

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Share Rooms</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.data.name}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
