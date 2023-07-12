import React from 'react';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  console.log(user?.data?.name); // Use optional chaining to avoid errors

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Share Rooms</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i class="fa-sharp fa-solid fa-bars "style={{ color:"white" }}></i></span> 
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.data.name}
                </button>
                <ul className="dropdown-menu white-bg">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
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
                
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
