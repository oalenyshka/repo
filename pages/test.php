<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <form action="../pages/test.php" method="get" name="f1">
            <div class="block">
                <label for="name">Имя</label>
                <input type="text" name="name" value="<?php if (isset($_REQUEST['name'])) echo $_REQUEST['name'] ?>">
                <label for="footwear">Обувь</label>
                <select name="footwear" id="">
                    <option value="ботинки" <?php if (isset($_REQUEST['footwear']) && $_REQUEST['footwear']=="ботинки") {echo ' selected';}?> >Ботинки</option>
                    <option value="сапоги" <?php if (isset($_REQUEST['footwear']) && $_REQUEST['footwear']=="сапоги") {echo ' selected';}?> >Сапоги</option>
                    <option value="сандали" <?php if (isset($_REQUEST['footwear']) && $_REQUEST['footwear']=="сандали") {echo ' selected';}?> >Сандали</option>
                </select>
            </div>
            <div class="block">
                <input type="radio" name="color" id="red" value="красный" <?php 
                    if (!empty($_REQUEST['color']) and $_REQUEST['color'] === 'красный') { echo 'checked';}?> >
                <span>Красный</span>
                <input type="radio" name="color" id="white" value="белый" <?php 
                    if (!empty($_REQUEST['color']) and $_REQUEST['color'] === 'белый') { echo 'checked';}?> >
                <span>Белый</span>
            </div>
            <div class="block">
                <input type="submit" name="btn" value="Паук">
                <input type="submit" name="btn" value="Утка">
                <input type="submit" name="btn" value="Собака">
            </div>
        </form>
    </div>
</body>
</html>

<?php
$name = "Имя";
$footwear = "обувь";
$color = "не выбран";
$btn = "животное";
$count = "число";
$img = "картинка";
if(isset($_REQUEST["btn"])){
    if(!empty($_REQUEST["name"])){
        $name = $_REQUEST["name"];
    }
    $footwear = $_REQUEST["footwear"];
    if(isset($_REQUEST["color"])){
        $color = $_REQUEST["color"];
    }
    $btn = $_REQUEST["btn"];
    $count = match ($btn) {
        "Паук" => 4,
        "Утка" => 1,
        "Собака" => 2,
        default => "не указано"
    };
    $img = match ($footwear) {
        "ботинки" => '<img src="../images/php/shoes3.png" width="100">',
        "сапоги" => '<img src="../images/php/shoes2.png" width="100">',
        "сандали" => '<img src="../images/php/shoes1.png" width="100">',
        default => "не указано"
    };
    echo "<br> <div class='info'><div class='info_text'>$name, Вы выбрали для животного: <br> $btn, $footwear <br> Цвет: $color <br> Количество пар обуви $count </div> <div>$img</div></div>";
}
?>


<style>
    .info{
        margin-top:30px;
        padding: 5px;
        width: 26%;
        display: flex;
        border: 1px solid black;
    }
    .info_text{
        margin-right: 20px;
    }
    .block{
        margin-top:20px;
    }
    input[type="submit"]{
        cursor:pointer;
        margin-right:15px;
    }
</style>