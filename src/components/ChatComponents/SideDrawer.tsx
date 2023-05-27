import React, { useState } from "react";

const SideDrawer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return <div>SideDrawer</div>;
};

export default SideDrawer;
