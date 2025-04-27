import React, { useState } from "react";
import { Box, Typography, IconButton, TextField, Paper, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function ChatBox() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there!\nHow can I help you today?" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "Thanks for your message! (AI will reply here)" }]);
    }, 1000);
    };
    return(
        <>
      {open ? (
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            right: 30,
            width: 300,
            height: 400,
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box sx={{ bgcolor: "#d8b4b4", p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ color: "#333", fontWeight: 500 }}>
              Beauty Chatbox
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: "#fafafa" }}>
            {messages.map((msg, idx) => (
              <Box key={idx} sx={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", mb: 1 }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    bgcolor: msg.sender === "user" ? "#f2e8e8" : "#f9f9f9",
                    whiteSpace: "pre-line",
                    borderRadius: 2,
                    maxWidth: "70%",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Box sx={{ p: 1, borderTop: "1px solid #eee", display: "flex", alignItems: "center" }}>
            <TextField
              variant="standard"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              InputProps={{ disableUnderline: true }}
            />
            <IconButton onClick={handleSend} sx={{ ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        // Floating Button
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            borderRadius: "50%",
            width: 60,
            height: 60,
            bgcolor: "#d8b4b4",
            minWidth: 0,
            "&:hover": { bgcolor: "#c69c9c" },
          }}
        >
          <ChatBubbleOutlineIcon sx={{ color: "#333" }} />
        </Button>
      )}
    </>
    )
}
export default ChatBox;