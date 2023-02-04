import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, message } from "antd";
import moment from "moment";
import React from "react";

type Props = {
  isMe: boolean;
  text?: string;
  photo?: string;
  username?: string;
  time?: string;
};

const items: MenuProps["items"] = [
  {
    label: "Delete",
    key: "delete",
  },
];

function BubbleChat(props: Props) {
  const [isMouseHover, setIsMouseHover] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "delete") {
      setOpen(false);
      //delete chat
      message.success("Successfully delete message.");
    }
  };

  return props?.isMe === false ? (
    <div
      className="Bubble-chat"
      style={{
        justifyContent: "flex-start",
      }}
    >
      <Avatar
        icon={<UserOutlined />}
        src={props.photo ? props.photo : null}
        className="Avatar-user"
      />
      <div
        className="talk-bubble tri-right round right-in"
        style={{
          backgroundColor: "white",
          cursor: isMouseHover ? "pointer" : "none",
        }}
        onMouseOver={() => {
          setIsMouseHover(true);
        }}
        onMouseLeave={() => {
          setIsMouseHover(false);
        }}
      >
        <div className="talktext">
          <p style={{ color: "#C59010" }}>{props.username}</p>
          <p>
            Moving our way back up the right side indented. Uses .round and
            .right-in
          </p>
          {isMouseHover ? (
            <p className="Chat-time">
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                onOpenChange={handleOpenChange}
                open={open}
              >
                <DownOutlined />
              </Dropdown>
            </p>
          ) : (
            <p className="Chat-time">{moment().format("LT")}</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="Bubble-chat" style={{ justifyContent: "flex-end" }}>
      <div
        className="talk-bubble tri-right round right-in"
        style={{ cursor: isMouseHover ? "pointer" : "none" }}
        onMouseOver={() => {
          setIsMouseHover(true);
        }}
        onMouseLeave={() => {
          setIsMouseHover(false);
        }}
      >
        <div className="talktext">
          <p>lorem ipsum</p>
          {isMouseHover ? (
            <p className="Chat-time">
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                onOpenChange={handleOpenChange}
                open={open}
              >
                <DownOutlined />
              </Dropdown>
            </p>
          ) : (
            <p className="Chat-time">{moment().format("LT")}</p>
          )}
        </div>
      </div>
      <Avatar
        icon={<UserOutlined />}
        src={props.photo ? props.photo : null}
        className="Avatar-user"
      />
    </div>
  );
}

export default BubbleChat;