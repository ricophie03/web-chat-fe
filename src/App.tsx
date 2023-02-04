import "./App.css";
import React from "react";
import { Input, Button, Avatar, Modal, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import BubbleChat from "./components/bubbleChat";

const { TextArea } = Input;

type userType = {
  userName: string;
  photoURL: string;
};

function App() {
  const listOfUser: string[] = [];
  const [user, setUser] = React.useState<userType>({
    userName: "",
    photoURL: "",
  });
  const [chatText, setChatText] = React.useState<string>("");
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
            {listOfUser.map((item, index) => {
              return (
                <div className="User-display" key={index}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Avatar style={{ margin: "5% 5% 0 0" }}>Rico</Avatar>
                    <h5>Coba</h5>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Box Chatbox-container">
            <div style={{ overflow: "auto", paddingBottom: "5rem" }}>
              <BubbleChat
                isMe={true}
                username={user.userName}
                photo={user.photoURL}
              />
              <BubbleChat
                isMe={false}
                username={user.userName}
                photo={user.photoURL}
              />
              <BubbleChat
                isMe={true}
                username={user.userName}
                photo={user.photoURL}
              />
              <BubbleChat
                isMe={true}
                username={user.userName}
                photo={user.photoURL}
              />
              <BubbleChat
                isMe={false}
                username={user.userName}
                photo={user.photoURL}
              />
              <BubbleChat
                isMe={false}
                username={user.userName}
                photo={user.photoURL}
              />
              <BubbleChat
                isMe={true}
                username={user.userName}
                photo={user.photoURL}
              />
              <BubbleChat
                isMe={false}
                username={user.userName}
                photo={user.photoURL}
              />
            </div>
            <div className="Chat-input-container">
              <div
                style={{
                  flex: windowWidth > 600 ? "25" : "9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "green",
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
                  // backgroundColor: "red",
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
            disabled={user.userName ? false : true}
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
            setUser({
              ...user,
              userName: e.target.value,
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
          alt={user.photoURL !== "" ? "User Profile" : "No Picture Selected"}
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
              setUser({
                ...user,
                photoURL: reader.result!.toString(),
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
