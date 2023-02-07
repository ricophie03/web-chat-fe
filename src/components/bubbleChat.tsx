import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, message, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";

type Props = {
  isMe: boolean;
  text?: string;
  photo?: string;
  username?: string;
  time?: any;
  id?: string;
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
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] =
    React.useState<boolean>(false);

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "delete") {
      setOpen(false);
      setIsModalDeleteOpen(true);
    }
  };

  const handleOkDeleteModal = async () => {
    try {
      setConfirmLoading(true);
      const deleteChat = await axios.delete(
        process.env.REACT_APP_BASE_URL + "/api/v1/chats/" + props.id
      );
      if (deleteChat) {
        setIsModalDeleteOpen(false);
        message.success("Successfully delete message.");
      }
      setConfirmLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong. Please contact administrator.");
      setIsModalDeleteOpen(false);
      setConfirmLoading(false);
    }
  };

  const handleCancelDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  return props.isMe === false ? (
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
            {props.text
              ? props.text
              : "Moving our way back up the right side indented. Uses .round and .right-in"}
          </p>
          <p className="Chat-time">
            {moment(props.time.toDate())
              .toDate()
              .toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
          </p>
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
          <p>{props.text ? props.text : "lorem ipsum"}</p>
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
            <p className="Chat-time">
              {moment(props.time.toDate())
                .toDate()
                .toLocaleTimeString(navigator.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
            </p>
          )}
        </div>
      </div>
      <Avatar
        icon={<UserOutlined />}
        src={props.photo ? props.photo : null}
        className="Avatar-user"
      />
      <Modal
        title="Confirmation Delete Chat"
        open={isModalDeleteOpen}
        onOk={handleOkDeleteModal}
        onCancel={handleCancelDeleteModal}
        confirmLoading={confirmLoading}
        closable
      >
        <p>Are you sure want to delete this message ?</p>
      </Modal>
    </div>
  );
}

export default BubbleChat;
