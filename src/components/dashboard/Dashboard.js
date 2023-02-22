import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ChoirsList from "./ChoirsList";
import styled from "styled-components";
import getAdmin from "../../network/getAdmin";
import findLocalToken from "../../helpers/findLocalToken";
import AdminFilter from "../AdminFilter";
import Display from "./Display";

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
`;

export default function Dashboard() {
  const { adminId } = useParams();
  const [choirs, setChoirs] = useState([]);
  const [selectedChoir, setSelectedChoir] = useState();
  const [token, setToken] = useState(findLocalToken())


  const loadAdmin = async function(abortSignal) {
    const loadedAdmin = await getAdmin(adminId, token, abortSignal)
    setChoirs(loadedAdmin.choirs);
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
          <ChoirsList choirs={choirs} setSelectedChoir={setSelectedChoir}/>
          <Display adminId={adminId} selectedChoir={selectedChoir}/>
        </Layout>
      </div>
    </AdminFilter>
  );

}