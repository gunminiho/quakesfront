
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentPage,setLoadedQuakes,setTotalPages } from "../../redux/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";


const Pagination = () => {

  const dispatch = useDispatch();
  const {earthquakes, quakesLoaded, Pagination:{currentPage,itemsPerPage,totalPages}} = useSelector((state) => state.user);
  useEffect(() => {
    if(quakesLoaded && earthquakes.data !== undefined){
      dispatch(setTotalPages(Math.ceil(earthquakes.data.length / itemsPerPage)));
    }
  }, [earthquakes,quakesLoaded,dispatch,itemsPerPage]);
  
  useEffect(() => {
    if(quakesLoaded && earthquakes.data !== undefined){
      dispatch(setLoadedQuakes(earthquakes.data.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage)));
    }
  }, [currentPage,quakesLoaded,earthquakes,dispatch,itemsPerPage]);
  
  const handlePage = (page) => {
    dispatch(setCurrentPage(Number(page)));
    dispatch(setLoadedQuakes(earthquakes.data.slice((page-1)*itemsPerPage, page*itemsPerPage)));
  }

  return (
    <nav aria-label={`Page navigation example d-md-none`} className="d-none d-sm-flex">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a className="page-link" href="#" onClick={() => handlePage(currentPage - 1)}>Previous</a>
        </li>
        {Array.from({ length:Math.min(3, totalPages - currentPage + 1) }, (_, i) => i + (currentPage - 1)).map((page) => (
          <li className={`page-item ${currentPage === (page+1) ? "active" : ""}`} key={page + 1}>
            <a onClick={() => !(currentPage===totalPages) && handlePage(page + 1)} className="page-link" href="#">{page + 1}</a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a className="page-link" href="#" onClick={() => handlePage(currentPage + 1)}>Next</a>
        </li>
      </ul>
    </nav>
  );
  
}

export default Pagination;
