import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../utils/utils";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat: React.FC = ({ messages }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((item, i) => (
          <div style={{ display: "flex" }} key={i}>
            {isSameSender(messages, item, i, userInfo.id) ||
              (isLastMessage(messages, i, userInfo.id) && (
                <Tooltip
                  label={item.sender.usrename}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    name={item.sender.username}
                    src={item.sender.profilePic}
                    mt={"7px"}
                    mr={1}
                    size={"sm"}
                    cursor={"pointer"}
                  />
                </Tooltip>
              ))}
            <span
              style={{
                backgroundColor: `${
                  item.sender._id === userInfo.id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, item, i, userInfo.id),
                marginTop: isSameUser(messages, item, i) ? 3 : 10,
              }}
            >
              {item.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
