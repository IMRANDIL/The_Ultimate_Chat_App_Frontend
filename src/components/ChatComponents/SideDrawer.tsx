import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Button, Tooltip } from "@chakra-ui/react";

const SideDrawer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <>
      <Box>
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i className="fa fa-search"></i>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SideDrawer;