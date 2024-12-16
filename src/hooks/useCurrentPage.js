import { useLocation } from "react-router-dom";
import pageDict from "../assets/pageDict.jsx";

const useCurrentPage = () => {
  const currentPath = useLocation().pathname;
  const currentPage = pageDict[currentPath].name;
  const currentPageIcon = pageDict[currentPath].icon;
  
  return { currentPath, currentPage, currentPageIcon };
};

export default useCurrentPage;
