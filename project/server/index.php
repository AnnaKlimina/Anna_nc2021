<?php
header("Content-type: application/json; charset=utf-8");

$conn = new mysqli("localhost", "anna", "kas1999", "projectDB");

if(isset($_GET["bookName"]) && isset($_GET["bookAuthor"]) && !isset($_GET["comments"]) && !isset($_GET["addComment"]))
{
    $bookName = $_GET["bookName"];
    $bookAuthor = $_GET["bookAuthor"];
    $text = "Not found";
    $sql = "SELECT * FROM Books WHERE bookName='".$bookName."' AND bookAuthor='".$bookAuthor."';";
    if($result = $conn->query($sql)){
        if(isset($_GET["reading"])){
            foreach($result as $book){
                $text = htmlentities(file_get_contents($book["textResource"]));
            }
            die($text);
        } else {
            foreach($result as $book){
            die(json_encode($book));
            }
        }
    
    }
}

if(isset($_GET["news"]) && isset($_GET["main_page"])){
    $sql = "SELECT id,link, img, header FROM News WHERE id<8;";
    if($result = $conn->query($sql)){
        $newsArr = [];
        foreach($result as $news ){
            $newsArr[] = $news; 
        }
        die(json_encode($newsArr));
    }
}

if(isset($_GET["books"]) && isset($_GET["main_page"])){
    if (isset($_GET["popular"])){
        $sql = "SELECT bookName, bookAuthor, img FROM Books ORDER BY addCount DESC";
    } elseif (isset($_GET["new"])) {
    $sql = "SELECT bookName, bookAuthor, img FROM Books ORDER BY addDate DESC";
    }
    if($result = $conn->query($sql)){
        $booksArr = [];
        $index = 8;
        foreach($result as $book ){
            $booksArr[] = $book; 
            $index--;
            if ($index == 0) break;
        }
        die(json_encode($booksArr));
    }
}

if(isset($_GET["comments"]) && isset($_GET["bookName"]) && isset($_GET["bookAuthor"])){
    $bookName = $_GET["bookName"];
    $bookAuthor = $_GET["bookAuthor"];
    $sql = "SELECT * FROM Comments WHERE bookName='".$bookName."' AND bookAuthor='".$bookAuthor."';";
    if($result = $conn->query($sql)){
        $commentsArr = [];
        foreach($result as $comment ){
            $commentsArr[] = $comment; 
        }
        die(json_encode($commentsArr));
    }
}

if(isset($_GET["newsContent"]) && isset($_GET["newsIndex"]) && isset($_GET["newsCount"])){
    $newsIndex = $_GET["newsIndex"];
    $newsCount = $_GET["newsCount"];
    $newsArr = [];
    $sql = "SELECT * FROM News WHERE id>".$newsIndex." AND id<=".($newsIndex+$newsCount).";";
    if($result = $conn->query($sql)){
        foreach($result as $news){
            $newsArr[] = $news; 
        }
        die(json_encode($newsArr));
    }
}

if(isset($_GET["newsDecor"]) && isset($_GET["decorIndex"]) && isset($_GET["decorCount"])){
    $decorIndex = $_GET["decorIndex"];
    $decorCount = $_GET["decorCount"];
    $decorArr = [];
    $sql = "SELECT * FROM NewsDecor WHERE id>".$decorIndex." AND id<=".($decorIndex+$decorCount).";";
    if($result = $conn->query($sql)){
        foreach($result as $decor){
            $decorArr[] = $decor; 
        }
    }
    if (!count($decorArr)){
        $sql = "SELECT * FROM NewsDecor WHERE id=1;";
        if($result = $conn->query($sql)){
            foreach($result as $decor){
                $decorArr[] = $decor; 
            }
        }
    }
    die(json_encode($decorArr[0]));
}

if(isset($_GET["library"])){
    $booksArr = [];
    $sql = "SELECT * FROM Books;";
    if($result = $conn->query($sql)){
        foreach($result as $book){
            $booksArr[] = $book; 
        }
        die(json_encode($booksArr));
    }
}

if(isset($_GET["search"])){
    $searchValue = $_GET["search"];
    $sql = "SELECT * FROM Books;";
    if($result = $conn->query($sql)){
        $booksArr = [];
        foreach($result as $book){
            if((strpos($book["bookName"], $searchValue) !== false) ||(strpos($book["bookAuthor"], $searchValue) !==false)){
                $booksArr[] = $book;
            }
        }
        die(json_encode($booksArr));
    }
}

if(isset($_GET["filter"])){
    $genreArr = json_decode($_GET["filter"]);
    $sql = "SELECT * FROM Books;";
    if($result = $conn->query($sql)){
        $booksArr = [];
        foreach($result as $book){
            if(count(array_diff($genreArr, array_intersect(explode( "," , $book["genreList"]), $genreArr))) === 0){
                $booksArr[] = $book;
            }
        }
        die(json_encode($booksArr));
    }
}

if(isset($_GET["checkLogin"])){
    $checkLogin = $_GET["checkLogin"];
    $sql = "SELECT login FROM Users WHERE login='".$checkLogin."';";
    if($result = $conn->query($sql)){
        $check = [];
        foreach($result as $book){
            $check[] = $book; 
        }
        if(count($check)){
            die(json_encode(true));
        } else {
             die(json_encode(false));
        }
    }
}

if(isset($_GET["checkBook"])&&isset($_GET["login"])){
    $checkBook = $_GET["checkBook"];
    $login = $_GET["login"];
    $sql = "SELECT userLibrary FROM Users WHERE login='".$login."';";
    if($result = $conn->query($sql)){
        $userLibrary = [];
        foreach($result as $lib){
            $userLibrary[] = $lib["userLibrary"]; 
        }
        if(!count($userLibrary)) die(json_encode(false));
        if(strpos($userLibrary[0], $checkBook) === false){
            die(json_encode(false));
        } else {
            die(json_encode(true));
        }
    }
}

if(isset($_POST["addToUserLibrary"])){
    $addBook = json_decode($_POST["addToUserLibrary"]);
    $sql = "SELECT userLibrary FROM Users WHERE login='".$addBook[0]."' ;";
    if($result = $conn->query($sql)){
        $userLibrary = [];
        foreach($result as $library){
            $userLibrary[] = $library["userLibrary"];
        }
        $userLibrary = $userLibrary[0];
        $sql = "UPDATE Users SET userLibrary='".$userLibrary."|".$addBook[1].",".$addBook[2]."' WHERE login='".$addBook[0]."';";
        $result = $conn->query($sql);
    }
    $sql = "UPDATE Books SET addCount=addCount+1 WHERE  bookName='".$addBook[1]."' AND bookAuthor='".$addBook[2]."';";
    $result = $conn->query($sql);
}

if(isset($_POST["addUser"])){
    $addUser = json_decode($_POST["addUser"]);
    $sql = "INSERT INTO Users (login, password, mail, avatar, userLibrary) VALUES('".$addUser[0]."','".$addUser[1]."','".$addUser[2]."','".$addUser[3]."','');";
    $result = $conn->query($sql);
}

if(isset($_GET["authorize"])&&isset($_GET["login"])&&isset($_GET["password"])){
    $login = $_GET["login"];
    $password = $_GET["password"];
    $sql = "SELECT * FROM Users WHERE login='".$login."' AND password='".$password."';";
    if($result = $conn->query($sql)){
        $check = [];
        foreach($result as $book){
            $check[] = $book; 
        }
        die(json_encode($check));
    }
}

if(isset($_POST["deleteFromUserLibrary"])){
    $removeBook = json_decode($_POST["deleteFromUserLibrary"]);

    $sql = "SELECT userLibrary FROM Users WHERE login='".$removeBook[0]."' ;";
    if($result = $conn->query($sql)){
        $userLibrary = [];
        foreach($result as $library){
            $userLibrary[] = $library["userLibrary"];
        }
        $userLibrary = $userLibrary[0];
        $sql = "UPDATE Users SET userLibrary='".(str_replace ( '|'.$removeBook[1].','.$removeBook[2], '' , $userLibrary ))."' WHERE login='".$removeBook[0]."';";
        $result = $conn->query($sql);
    }
    $sql = "UPDATE Books SET addCount=addCount-1 WHERE  bookName='".$removeBook[1]."' AND bookAuthor='".$removeBook[2]."';";
    $result = $conn->query($sql);
}

if(isset($_GET["userLibrary"])&&isset($_GET["login"])){
    $login = $_GET["login"];
    $sql = "SELECT userLibrary FROM Users WHERE login='".$login."' ;";
    if($result = $conn->query($sql)){
        $booksList = [];
        foreach($result as $library){
            $booksList[] = $library["userLibrary"];
            }
        $booksList = explode( "|" , $booksList[0]) ;
        $userLibrary = [];
        $sql = "SELECT * FROM Books;";
        if($result = $conn->query($sql)){
            foreach($result as $book){
                if(array_search( $book["bookName"].",".$book["bookAuthor"], $booksList) !== false){
                $userLibrary[] = $book; 
                }
            }
        die(json_encode($userLibrary));
        }
    }
}


if(isset($_POST["addComment"])){
    $comments = json_decode($_POST["addComment"]);
    $sql = "INSERT INTO Comments (bookName, bookAuthor, commentAuthor, img, commentContent, addDate) VALUES ('".$comments[0]."','".$comments[1]."','".$comments[3]."','".$comments[2]."','".$comments[5]."','".$comments[4]."') ;";
    $result = $conn->query($sql);
    $sql = "UPDATE Books SET commentCount=commentCount+1 WHERE  bookName='".$comments[0]."' AND bookAuthor='".$comments[1]."';";
    $result = $conn->query($sql);
}

if(isset($_POST["changeLogin"])){
    $changeLogin = json_decode($_POST["changeLogin"]);
    $sql = "UPDATE Users SET login='".$changeLogin[1]."' WHERE  login='".$changeLogin[0]."';";
    $result = $conn->query($sql);
}

if(isset($_POST["changePassword"])){
    $changePassword = json_decode($_POST["changePassword"]);
    $sql = "UPDATE Users SET password='".$changePassword[1]."' WHERE  login='".$changePassword[0]."';";
    $result = $conn->query($sql);
}

if(isset($_REQUEST["changeAvatar"])){
    $imgDir = "img"; 
    if (!file_exists($imgDir))
        mkdir($imgDir, 0777); 
    $data = $_FILES ['avatar'];
    $tmp = $data ['tmp_name'];
    $user = $_POST ['login'];
 
    if (file_exists($tmp)) {
        $info = getimagesize($_FILES ['avatar'] ['tmp_name']);
        if (preg_match('{image/(.*)}is', $info['mime'], $p)) {
            $name = "$imgDir/" . time() . "." . $p[1];
            move_uploaded_file($tmp, $name);            
        }
        $sql = "SELECT avatar FROM Users WHERE login='".$user."';";
        if($result = $conn->query($sql)){
            $avatar = [];
            foreach($result as $item){
                $avatar[] = $item["avatar"]; 
            }
            $avatar = $avatar[0];
            if(strpos($avatar, "../../server/") !== false) unlink(str_replace ( "../../server/", './' , $avatar ));
        }
        $sql = "UPDATE Users SET avatar='../../server/".$name."' WHERE  login='".$user."';";
        $result = $conn->query($sql);
        header('Location: http://localhost/client/src/index.html');
    } 
}

if(isset($_GET["checkPassword"])){
    $checkPassword = json_decode($_GET["checkPassword"]);
    $sql = "SELECT password FROM Users WHERE login='".$checkPassword[0]."';";
    if($result = $conn->query($sql)){
        $check = [];
        foreach($result as $password){
            $check[] = $password["password"]; 
        }
        if($check[0] === $checkPassword[1]){
            die(json_encode(true));
        } else {
             die(json_encode(false));
        }
    }
}
?>

