import React, { useState } from "react";
import Header from "./components/Header/header";
import ChatInterface from "./components/Chat/chat";

const App = () => {
  const [pdfText, setPdfText] = useState("");

  return (
    <div>
      <Header setPdfText={setPdfText} />
      <ChatInterface pdfText={pdfText} />
    </div>
  );
};

export default App;

