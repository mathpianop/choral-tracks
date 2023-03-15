import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import ChoirsList from "./ChoirsList";
import styled from "styled-components";
import getAdmin from "../../network/getAdmin";
import findLocalToken from "../../helpers/findLocalToken";
import AdminFilter from "../AdminFilter";
import Display from "./Display";
import Choir from "../../models/Choir";


const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
`;

export default function Dashboard() {
  const { adminId } = useParams();
  const [choirs, setChoirs] = useState([]);
  const [token, setToken] = useState(findLocalToken());
  const location = useLocation();
  const [selectedChoirId, setSelectedChoirId] = useState(location.state && parseInt(location.state.selectedChoirId));
  // Define if linked to from choir page


  const loadAdmin = async function(abortSignal) {
    const loadedAdmin = await getAdmin(adminId, token, abortSignal)
    // Convert choir records to Choir model before setting
    setChoirs(loadedAdmin.choirs);
    // if (selectedChoirId) {
    //   setSelectedChoirId(getChoirById(loadedAdmin.choirs, selectedChoirId))
    // }
  }
  const getChoirById = function(id) {
    if (id === "new") {
      return Choir()
    } else {
      return choirs && choirs.find(choir => {
        return choir.choir_details.id === id
      })
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    loadAdmin(abortController.signal);
    return () => abortController.abort();
    // eslint-disable-next-line 
  }, [])

  return (
    <AdminFilter token={token} setToken={setToken} targetPath={`./admin/${adminId}`}>
      <div id="Dashboard">
        <Layout>
          <ChoirsList 
            choirs={choirs} 
            setSelectedChoirId={setSelectedChoirId}
            selectedChoirId={selectedChoirId}
          />
          <Display 
            updateChoirs={loadAdmin} 
            adminId={adminId} 
            selectedChoir={getChoirById(selectedChoirId)}
          />
        </Layout>
      </div>
    </AdminFilter>
  );

}