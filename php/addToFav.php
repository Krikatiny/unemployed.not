<?php
require __DIR__ . "/connectionCheck.php";
$mysqli = require __DIR__ . "/database.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["vac_id"])) {
        // Перевірка, чи користувач увійшов у систему та має дійсний user_id
        if (isset($_SESSION["user_id"])) {
            $vacancyId = $_POST["vac_id"];
            $userId = $_SESSION["user_id"];

            // Перевірка, чи вакансія вже є улюбленою для користувача
            $sql = "SELECT * FROM user_favourite WHERE user_id = ? AND vac_id = ?";
            $stmt = $mysqli->prepare($sql);
            if (!$stmt) {
                die("Помилка SQL: " . $mysqli->error);
            }

            $stmt->bind_param("ii", $userId, $vacancyId);
            $stmt->execute();
            $result = $stmt->get_result();
            $favorite = $result->fetch_assoc();

            if ($favorite) {
                // Вакансія вже є улюбленою, повертаємо відповідне повідомлення
                echo json_encode(["message" => "Ця вакансія вже додана до улюблених"]);
            } else {
                // Додаємо вакансію до улюблених
                $sql = "INSERT INTO user_favourite (user_id, vac_id) VALUES (?, ?)";
                $stmt = $mysqli->prepare($sql);

                if (!$stmt) {
                    die("Помилка SQL: " . $mysqli->error);
                }
                $stmt->bind_param("ii", $userId, $vacancyId);

                if ($stmt->execute()) {
                    // Вакансію успішно додано до улюблених
                    echo json_encode(["message" => "Вакансія додана до улюблених"]);
                } else {
                    // Помилка під час додавання вакансії до улюблених
                    echo json_encode(["message" => "Помилка під час додавання вакансії до улюблених"]);
                }
            }
        } else {
            // Обробка ситуації, коли користувач не увійшов у систему
            echo json_encode(["message" => "Користувач не увійшов у систему"]);
        }
    } else {
        // Якщо не надано 'vac_id', повертаємо повідомлення про помилку
        echo json_encode(["message" => "Не передано ідентифікатор вакансії"]);
    }
}
?>
