<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-API-Key");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

// Autentikasi API Key (Kriteria 4)
$VALID_API_KEY = "todo-key-5025251093";
$headers = function_exists('getallheaders') ? getallheaders() : [];
$apiKey = $headers['X-API-Key'] ?? $headers['x-api-key'] ?? $_SERVER['HTTP_X_API_KEY'] ?? '';

if ($apiKey !== $VALID_API_KEY) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized: X-API-Key tidak valid atau tidak disertakan"
    ]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        if ($id !== null) {
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Bad Request: ID harus angka positif"]);
                exit();
            }
            $stmt = mysqli_prepare($conn, "SELECT * FROM tasks WHERE id = ?");
            mysqli_stmt_bind_param($stmt, "i", $id);
            mysqli_stmt_execute($stmt);
            $task = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

            if (!$task) {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Not Found: Task ID $id tidak ditemukan"]);
                exit();
            }
            http_response_code(200);
            echo json_encode(["status" => "success", "data" => $task]);
        } else {
            $result = mysqli_query($conn, "SELECT * FROM tasks ORDER BY id DESC");
            $tasks = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $tasks[] = $row;
            }
            http_response_code(200);
            echo json_encode(["status" => "success", "data" => $tasks]);
        }
        break;

    case 'POST':
        if (empty($input['name']) || empty($input['start_date']) || empty($input['deadline'])) {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Bad Request: Field name, start_date, dan deadline wajib diisi"
            ]);
            exit();
        }

        $name = $input['name'];
        $start = $input['start_date'];
        $deadline = $input['deadline'];
        $desc = $input['description'] ?? '';

        $stmt = mysqli_prepare($conn, "INSERT INTO tasks (name, start_date, deadline, description) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssss", $name, $start, $deadline, $desc);

        if (mysqli_stmt_execute($stmt)) {
            $newId = mysqli_insert_id($conn);
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Task berhasil dibuat",
                "data" => [
                    "id" => $newId,
                    "name" => $name,
                    "start_date" => $start,
                    "deadline" => $deadline,
                    "description" => $desc,
                    "is_completed" => 0
                ]
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Internal Server Error: Gagal menyimpan data"]);
        }
        break;

    case 'PUT':
    case 'PATCH':
        if (!$id || $id <= 0) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Bad Request: Parameter ?id= wajib diisi"]);
            exit();
        }

        $check = mysqli_prepare($conn, "SELECT * FROM tasks WHERE id = ?");
        mysqli_stmt_bind_param($check, "i", $id);
        mysqli_stmt_execute($check);
        $existing = mysqli_fetch_assoc(mysqli_stmt_get_result($check));

        if (!$existing) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Not Found: Task ID $id tidak ditemukan"]);
            exit();
        }

        if ($method === 'PUT') {
            if (empty($input['name']) || empty($input['start_date']) || empty($input['deadline'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Bad Request: PUT wajib mengirim name, start_date, dan deadline"]);
                exit();
            }
            $name = $input['name'];
            $start = $input['start_date'];
            $deadline = $input['deadline'];
            $desc = $input['description'] ?? $existing['description'];
            $completed = isset($input['is_completed']) ? intval($input['is_completed']) : intval($existing['is_completed']);
        } else {
            // PATCH: cukup kirim field yang mau diubah (atau kosong untuk toggle status selesai)
            $name = $input['name'] ?? $existing['name'];
            $start = $input['start_date'] ?? $existing['start_date'];
            $deadline = $input['deadline'] ?? $existing['deadline'];
            $desc = $input['description'] ?? $existing['description'];
            $completed = isset($input['is_completed']) ? intval($input['is_completed']) : ($existing['is_completed'] == 1 ? 0 : 1);
        }

        $stmt = mysqli_prepare($conn, "UPDATE tasks SET name=?, start_date=?, deadline=?, description=?, is_completed=? WHERE id=?");
        mysqli_stmt_bind_param($stmt, "ssssii", $name, $start, $deadline, $desc, $completed, $id);
        mysqli_stmt_execute($stmt);

        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Task ID $id berhasil diupdate"]);
        break;

    case 'DELETE':
        if (!$id || $id <= 0) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Bad Request: Parameter ?id= wajib diisi"]);
            exit();
        }

        $check = mysqli_prepare($conn, "SELECT id FROM tasks WHERE id = ?");
        mysqli_stmt_bind_param($check, "i", $id);
        mysqli_stmt_execute($check);
        if (!mysqli_fetch_assoc(mysqli_stmt_get_result($check))) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Not Found: Task ID $id tidak ditemukan"]);
            exit();
        }

        $stmt = mysqli_prepare($conn, "DELETE FROM tasks WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);

        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Task ID $id berhasil dihapus"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
        break;
}
?>
