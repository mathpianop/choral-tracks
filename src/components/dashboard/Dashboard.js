import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ChoirsList from "./ChoirsList";

export default function Dashboard() {
  const { adminId } = useParams();
  const [choirs, setChoirs] = useState([]);

  const loadChoirs = async function() {
    const loadedChoirs = [{name: "first"}, {name: "second"}];
    setChoirs(loadedChoirs);
  }

  useEffect(() => {
    loadChoirs();
  }, [])

  return (
    <div id="Dashboard">
      {`This is the dashboard for Admin #${adminId}`}
      <ChoirsList choirs={choirs} />
    </div>
  );

}