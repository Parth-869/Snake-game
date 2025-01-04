<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Snake Game</title>
</head>
<body>
    <h1>Welcome to the Snake Game</h1>
    <canvas id="gameCanvas" width="400" height="400" style="border:1px solid #000;"></canvas>

    <h2>High Scores</h2>
    <ul>
        <c:forEach var="score" items="${highScores}">
            <li>${score}</li>
        </c:forEach>
    </ul>
</body>
</html>
