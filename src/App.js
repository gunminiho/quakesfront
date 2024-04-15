import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {setEarthquakes,setQuakesLoaded} from "./redux/userSlice";
import Card from "./Card/Card";
import CardContainer from "./CardContainer/CardContainer";
import LoadingScreen from "./Loading/LoadingScreen";
import NavBar from "./NavBar/NavBar";
import baseUrl from "./endpoint";

function App() {

  const {frameCount,quakesLoaded, Pagination:{itemsPerPage}} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // esto puede tambien ser una variable de entorno pero se deja asi por simplicidad
  const endPointUrl = baseUrl();

  useEffect(() => {
    fetch(endPointUrl)
      .then((response) =>
        response.ok
          ? response.json()
          : new Error(
              `Failed to fetch earthquakes: ${response.status} ${response.statusText}`
            )
      )
      .then((data) => {
        dispatch(setEarthquakes(data));
        dispatch(setQuakesLoaded(true));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <header className="container-fluid border-dark-subtle border-5 bg-success-subtle d-flex justify-content-center align-items-center">
        <img
          src={process.env.PUBLIC_URL + "/logox.png"}
          alt="earthquake reporter logo"
          className="w-25 d-inline"
        />
        {/* Oculta y muestra el texto segun tamaño de pantalla celular, tablet y PC*/}
        <h5 className="d-sm-none d-inline ">The Earthquake Report</h5>
        <h2 className="d-none d-sm-inline d-md-none">The Earthquake Report</h2>
        <h1 className="d-none d-md-inline ">The Earthquake Report</h1>
      </header>
      <main>
        
        <section>
          {/* Oculta y muestra el texto segun tamaño de pantalla celular, tablet y PC*/}
          <h5 className="d-sm-none text-nowrap bg-body-secondary border fw-bold text-center">
            Last {itemsPerPage}{/*earthquakes.pagination.per_page*/} Earthquake reports
          </h5>
          <h2 className="d-none d-sm-block d-md-none text-nowrap bg-body-secondary border fw-bold text-center">
            Last {itemsPerPage} Earthquake reports
          </h2>
          <h1 className="d-none d-md-block text-nowrap bg-body-secondary border fw-bold text-center">
            Last {itemsPerPage} Earthquake reports 
          </h1>
          <NavBar/>
          {/* Oculta y muestra las cards con la info del sismo segun tamaño de pantalla celular, tablet y PC*/}
          {frameCount < itemsPerPage  && <LoadingScreen /> }
           {quakesLoaded && <Card/> }
           {quakesLoaded && <CardContainer/> }     
        </section>
      </main>
      <footer >
        <p className="lead text-center mt-5">Derechos de autor © 2024 - Erick Pajares.</p> 
      </footer>
    </>
  );
}

export default App;