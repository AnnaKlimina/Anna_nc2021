const express = require("express");
const fs = require("fs");
const { MongoClient } = require("mongodb");
var fileUpload = require("express-fileupload");

const jsonParser = express.json();
const app = express();
app.use(express.static("img"));
app.use(fileUpload({}));
const port = process.env.PORT || 8001;

const uri =
  "mongodb+srv://admin:libraryDB@librarydb.j8rbm.mongodb.net/myLibraryProjectDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
let database;

app.use(express.static("public"));

(async () => {
  try {
    await client.connect();
    database = client.db("myLibraryProjectDB");
    await app.listen(port);
  } catch (err) {
    return;
  }
})();

app.get("/library", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );

  try {
    const collection = database.collection("books");
    let result = await collection.find({}).toArray();
    response.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
});

app.get("/user_library", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    let collection = database.collection("users");
    let result = await collection
      .find({ login: request.query.login })
      .toArray();
    let userLibrary = result[0].userLibrary;

    collection = database.collection("books");
    let books = await collection.find({ login: request.query.login }).toArray();
    response.send(
      JSON.stringify(
        books.filter((book) => {
          userLibrary.includes(book.bookName + "," + book.bookAuthor);
        })
      )
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/search", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    let collection = database.collection("books");
    let books = await collection.find({}).toArray();
    let search = request.query.book.toLowerCase();
    response.send(
      JSON.stringify(
        books.filter(
          (book) =>
            book.bookName.toLowerCase().includes(search) ||
            book.bookAuthor.toLowerCase().includes(search)
        )
      )
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/book_page", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    let collection = database.collection("books");
    let book = await collection
      .find({
        bookName: request.query.book_name,
        bookAuthor: request.query.book_author,
      })
      .toArray();
    response.send(JSON.stringify(book));
  } catch (err) {
    console.log(err);
  }
});

app.get("/filter", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );

  try {
    let collection = database.collection("books");
    let genreList = JSON.parse(request.query.genres);
    let books = await collection.find({}).toArray();
    response.send(
      JSON.stringify(
        books.filter(
          (book) =>
            book.genreList
              .filter((genre) => genreList.includes(genre))
              .sort()
              .join(",") === genreList.sort().join(",")
        )
      )
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/check_book", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    let collection = database.collection("users");
    let user = await collection
      .find({ login: request.query.login })
      .toArray()[0].userLibrary;
    let userLibrary = user[0].userLibrary;

    response.send(JSON.stringify(userLibrary.includes(request.query.book)));
  } catch (err) {
    console.log(err);
  }
});

app.post("/add_to_user_library", jsonParser, async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  if (!request.body) return response.sendStatus(400);
  const userLogin = request.body.login;
  const book = request.body.book;
  try {
    let collection = database.collection("users");
    let userLibrary = await collection
      .find({ login: userLogin })
      .toArray()[0]
      .userLibrary.push(book);
    await collection.findOneAndUpdate(
      { login: userLogin },
      { $set: { userLibrary: userLibrary } }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete_from_user_library", jsonParser, async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  if (!request.body) return response.sendStatus(400);
  const userLogin = request.body.login;
  const deleteBook = request.body.book;
  try {
    let collection = database.collection("users");
    let userLibrary = await collection
      .find({ login: userLogin })
      .toArray()[0]
      .userLibrary.filter((book) => book !== deleteBook);
    await collection.findOneAndUpdate(
      { login: userLogin },
      { $set: { userLibrary: userLibrary } }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/add_comment", jsonParser, async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  if (!request.body) return response.sendStatus(400);
  const comment = request.body;
  try {
    let collection = database.collection("books");
    let result = await collection
      .find({ bookName: comment.bookName, bookAuthor: comment.bookAuthor })
      .toArray()[0]
      .comments.push({
        img: comment.img,
        commentAuthor: comment.commentAuthor,
        addDate: comment.addDate,
        commentContent: comment.commentContent,
      });
    await collection.findOneAndUpdate(
      { bookName: comment.bookName, bookAuthor: comment.bookAuthor },
      { $set: { comments: result } }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/main_page_news", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );

  try {
    const collection = database.collection("news");
    let result = await collection
      .find({}, { link: 1, img: 1, header: 1 })
      .toArray();
    response.send(JSON.stringify(result.reverse().splice(0, 6)));
  } catch (err) {
    console.log(err);
  }
});

app.get("/popular_books_main_page", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );

  try {
    const collection = database.collection("books");
    let result = await collection
      .find({}, { bookName: 1, bookAuthor: 1, img: 1, addCount: 1 })
      .toArray();
    result.sort((bookA, bookB) => bookB.addCount - bookA.addCount);
    response.send(JSON.stringify(result.splice(0, 7)));
  } catch (err) {
    console.log(err);
  }
});

app.get("/new_books_main_page", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    const collection = database.collection("books");
    let result = await collection
      .find({}, { bookName: 1, bookAuthor: 1, img: 1, addDate: 1 })
      .toArray();
    result.sort((bookA, bookB) => {
      let dateA = new Date(bookA.addDate);
      let dateB = new Date(bookB.addDate);
      return dateB - dateA;
    });
    response.send(JSON.stringify(result.splice(0, 7)));
  } catch (err) {
    console.log(err);
  }
});

app.get("/news_content", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    const collection = database.collection("news");
    let index = request.query.news_index;
    let count = request.query.news_count;
    let result = await collection.find({}).toArray();
    response.send(JSON.stringify(result.splice(index, count)));
  } catch (err) {
    console.log(err);
  }
});

app.get("/decor_content", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    const collection = database.collection("decorBlocks");
    let index = request.query.decor_index;
    let count = request.query.decor_count;
    let result = await collection.find({}).toArray();
    if (!result[index]) index = 0;
    response.send(JSON.stringify([result[index], index]));
  } catch (err) {
    console.log(err);
  }
});

app.get("/reading", async function (request, response) {
  try {
    const collection = database.collection("books");
    let name = request.query.book_name;
    let author = request.query.book_author;
    let result = await collection
      .find({ bookName: name, bookAuthor: author })
      .toArray();
    fs.readFile(result[0].textResource, "utf-8", function (error, data) {
      if (error) return console.log(error);
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader(
        "Access-Control-Allow-Headers",
        "origin, content-type, accept"
      );
      response.setHeader("Content-Type", "text/html; charset=utf-8");
      response.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/check_password", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    const collection = database.collection("users");
    let input = request.query.input;
    let userLogin = request.query.login;
    let password = await collection.find({ login: userLogin }).toArray()[0]
      .password;
    response.send(JSON.stringify(password === input));
  } catch (err) {
    console.log(err);
  }
});

app.post("/change_login", jsonParser, async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  if (!request.body) return response.sendStatus(400);
  const oldLogin = request.body.old;
  const newLogin = request.body.new;
  try {
    let collection = database.collection("users");
    await collection.findOneAndUpdate(
      { login: oldLogin },
      { $set: { login: newLogin } }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/change_password", jsonParser, async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  if (!request.body) return response.sendStatus(400);
  const userLogin = request.body.login;
  const newPassword = request.body.newPassword;
  try {
    let collection = database.collection("users");
    await collection.findOneAndUpdate(
      { login: userLogin },
      { $set: { password: newPassword } }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/check_exist_login", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    const collection = database.collection("users");
    let input = request.query.input;
    let users = await collection.find({ login: input }).toArray();
    response.send(JSON.stringify(users.length !== 0));
  } catch (err) {
    console.log(err);
  }
});

app.post("/add_user", jsonParser, async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  if (!request.body) return response.sendStatus(400);

  try {
    const user = request.body;
    if (
      user.avatar !==
      "https://my-library-project-server.herokuapp.com/img/defaultUserAvatar.png"
    ) {
      let date = new Date();
      date = date.getMilliseconds();
      user.avatar.name = date + "." + user.avatar.name.split(".")[1];
      let path =
        "https://my-library-project-server.herokuapp.com/img/" +
        user.avatar.name;
      user.avatar.mv("img/" + user.avatar.name);
      user.avatar = path;
    }
    let collection = database.collection("users");
    collection.insertOne(user, function (err, result) {
      if (err) {
        return console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/authorise", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    const collection = database.collection("users");
    let inputLogin = request.query.login;
    let inputPassword = request.query.password;
    let user = await collection
      .find({ login: inputLogin, password: inputPassword })
      .toArray();
    response.send(JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
});

app.get("/closeDB", async function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  try {
    await client.close();
    console.log("end");
  } catch (err) {
    console.log(err);
  }
});
