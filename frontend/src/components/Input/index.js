import { useState } from "react";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function Input({ label, text, action }) {
  const [input, setInput] = useState("");

  const click = () => {
    action(input);
    setInput("");
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Container
      sx={{
        m: 1,
        display: "flex",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        value={input}
        onChange={handleChange}
        style={{ margin: "10px" }}
      />
      <Button style={{ maxHeight: "50px" }} variant="contained" onClick={click}>
        {text}
      </Button>
    </Container>
  );
}
