import "./App.css";
import React from "react";
import { Input, Button, Avatar, Modal, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import BubbleChat from "./components/bubbleChat";
import Firebase from "./firebase/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const { TextArea } = Input;

type userType = {
  username: string;
  photo_url: string;
};

type messageType = {
  id: string;
  username: string;
  message_text: string;
  time: any;
};

function App() {
  const { app } = Firebase();
  const [me, setMe] = React.useState<userType>({
    username: "",
    photo_url: "",
  });
  const [chatText, setChatText] = React.useState<string>("");
  const [messages, setMessages] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  function handleSendChat() {
    setChatText("");
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(getFirestore(app), "messages"),
      async (document) => {
        const documentData = document.docs;
        if (documentData) {
          documentData.forEach((doc) => {
            setMessages((oldArray) => [
              ...oldArray,
              { ...doc.data(), id: doc.id },
            ]);
          });
        }
      }
    );

    return unsub;
  }, [app]);

  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(getFirestore(app), "users"),
      async (document) => {
        const documentData = document.docs;
        if (documentData) {
          documentData.forEach((doc) => {
            setUsers((oldArray) => [
              ...oldArray,
              { ...doc.data(), id: doc.id },
            ]);
          });
        }
      }
    );

    return unsub;
  }, [app]);

  return (
    <div className="App-background">
      {isModalOpen ? (
        <Spin />
      ) : (
        <div className="App-container">
          <div className="Box User-container">
            <div style={{ fontSize: "1.5rem", marginLeft: ".5rem" }}>
              Current User :{" "}
            </div>
            {users.map((item: userType, index: number) => {
              return (
                <div
                  className="User-display"
                  key={index}
                  style={{
                    borderWidth: index !== users.length - 1 ? "0 0 2px" : "0",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Avatar
                      style={{ margin: "5% 5% 0 0" }}
                      src={item.photo_url}
                    >
                      {item.username}
                    </Avatar>
                    <h5>{item.username}</h5>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Box Chatbox-container">
            <div style={{ overflow: "auto", paddingBottom: "5rem" }}>
              {messages.map((item: messageType, index: number) => {
                const getPhotoUrl: userType = users.find(
                  (data: userType) =>
                    data.username.toLowerCase() === item.username.toLowerCase()
                );
                return (
                  <BubbleChat
                    isMe={
                      item.username.toLowerCase() === me.username.toLowerCase()
                        ? true
                        : false
                    }
                    username={item.username}
                    text={item.message_text}
                    time={item.time}
                    photo={getPhotoUrl.photo_url}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="Chat-input-container">
              <div
                style={{
                  flex: windowWidth > 600 ? "25" : "9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextArea
                  className="Chat-input"
                  placeholder="Click Send Button or Press Enter to send message"
                  value={chatText}
                  autoSize
                  onChange={(e) => {
                    setChatText(e.target.value);
                  }}
                  onPressEnter={(e) => {
                    if (e.shiftKey && e.key === "Enter") {
                      return;
                    } else {
                      e.preventDefault();
                      setChatText("");
                      // send chat here too
                    }
                  }}
                  style={{
                    width: windowWidth > 600 ? "98%" : "90%",
                  }}
                />
              </div>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  position: "relative",
                }}
              >
                <Button
                  className="Button-send-chat"
                  type="primary"
                  shape="circle"
                  icon={<SendOutlined />}
                  size={"middle"}
                  onClick={handleSendChat}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Setting User Info"
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        centered
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={me.username ? false : true}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <h4>Username</h4>
        <Input
          placeholder="John Doe"
          onChange={(e) => {
            setMe({
              ...me,
              username: e.target.value,
            });
          }}
          required
        />
        <h4>User Profile (Optional)</h4>
        <button
          className="EditProfileUploadButton"
          onClick={function () {
            document.getElementById("selectedFile")?.click();
          }}
        >
          Upload
        </button>
        <img
          id="img"
          alt={me.photo_url !== "" ? "User Profile" : "No Picture Selected"}
          width={50}
          height={50}
        ></img>
        {/* function to upload file(not visible) */}
        <input
          type="file"
          name="myImage"
          id="selectedFile"
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: "none" }}
          onChange={async function (event) {
            const img: any = document.querySelector("#img");
            if (event.target.files!.length === 0) {
              console.error("No file provided");
              return;
            }
            const reader = new FileReader();
            reader.addEventListener("loadend", () => {
              img!.src = reader.result!.toString();
              setMe({
                ...me,
                photo_url: reader.result!.toString(),
              });
            });
            reader.readAsDataURL(event.target.files![0]);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
