import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/index.css";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const resp = await axios.get("http://localhost:3210/home", {
          withCredentials: true,
        });

        if (resp.data.success) {
          setUser(resp.data.user);
        }
      } catch (error) {
        console.log("No active session");
      }
    };

    checkSession();
  }, []);

  return (
    <div className="container">
      {user ? (
        <>
          <header className="header">
            <h1>E-Library</h1>
            <p>Welcome, {user.username}</p>
            <nav>
              <Link to="/home">
                <button>Home</button>
              </Link>
              <Link to="/levels">
                <button>Levels</button>
              </Link>
              <Link to="/category">
                <button>Category</button>
              </Link>
              <Link to="/trade">
                <button>Trade</button>
              </Link>
            </nav>
          </header>

          <main className="body">
            <section className="profile"></section>
            <section className="books">
              {[...Array(50)].map((_, index) => (
                <div key={index}></div>
              ))}
            </section>
          </main>

          <footer>
            <label>
              <a href="#">
                <img src="instagram.jpg" alt="Instagram" />
              </a>
            </label>
            <label>
              <a href="#">
                <img src="fb.jpg" alt="Facebook" />
              </a>
            </label>
            <label>
              <a href="#">
                <img src="x.jpg" alt="Twitter" />
              </a>
            </label>
            <label>
              <a href="#">
                <img src="yt.jpg" alt="YouTube" />
              </a>
            </label>
            <label>
              <a href="#">
                <img src="tsapp.jpg" alt="WhatsApp" />
              </a>
            </label>
            <p>E-Library for improving education in Rwanda</p>
            <p>&copy; 2025</p>
          </footer>
        </>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Home;
