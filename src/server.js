const express = require("express");

const app = express();

// HTTP verbs - GET, POST, PUT, DELETE

const fakeArr = [];

app.use(express.json());

// HTTP verb GET
app.get("/getAllBooks", (request, responce) => {
  responce.send({ message: "success", fakeArr: fakeArr });
});

app.post("/addBook", (request, response) => {
  fakeArr.push(request.body);
  console.log(fakeArr);
  response.send({ message: "success", newBook: fakeArr[fakeArr.length - 1] });
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
