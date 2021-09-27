<?php

$contador=0;
$contadorGET=0;
$contadorPOST=0;
$contadorHEAD=0;
$contadorInvalid=0;

/**
 * Main Entry Point Reads the file and iterates over each line to generate a JSON file
 *
 * @return void
 */
function main(){
    require "utils.php";
    $ini = parse_ini_file("../".'config_backend.ini');
    $input_filename= dirname(dirname(__FILE__))."\\".$ini['input_filename'];
    $output_filename = dirname(dirname(__FILE__))."\\".$ini['output_filename'];
    $json_list=[];
    $input_file = fopen($input_filename,"r");
    if($input_file){
    while(!feof($input_file))
        {
            preg_match_all('/"(?s:.)*"|\S+/', (fgets($input_file)), $matches);
            $json=createJSONfromArray($matches[0]);
            if(!empty($json)){
                $json_list[]=$json;

                //************SECTION ONLY FOR VALIDATION - TO SHOW THE STATS OF REQUEST VALID BY TYPE */
                if($json["request"]["method"]=="GET"){
                    $GLOBALS['contadorGET']++;
                }elseif($json["request"]["method"]=="POST"){
                    $GLOBALS['contadorPOST']++;
                }elseif($json["request"]["method"]=="HEAD"){
                    $GLOBALS['contadorHEAD']++;
                }else{
                    $GLOBALS['contadorInvalid']++;
                }
                //***************END OF VALIDATION SECTION */

            }
        }
        $GLOBALS['contador']=sizeof($json_list);
        fclose($input_file);
        writeJSONtoFile($json_list,  $output_filename);
        renderHTML();
    }
}

/**
 * Encodes the Array of Elements into JSON and writes it to a file
 *
 * @param Array $json_list - array of elements to be encoded as JSON
 * @param String $output_filename - filename to where the JSON wil be stored
 * @return void
 */
function writeJSONtoFile($json_list, $output_filename){
    $json_data = json_encode($json_list,JSON_UNESCAPED_SLASHES);
    if(!empty($json_data)){
        file_put_contents($output_filename, $json_data);
    }
}

function renderHTML(){
echo <<<EOD

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">

    <title>Backend - Http Request Stats</title>
  </head>
  <body>

    <div class="container">
        <table class="table table-striped table-hover">
        <thead>
            <tr>
            <th scope="col">Request Type</th>
            <th scope="col">Total Quantity</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>GET</td>
            <td>{$GLOBALS['contadorGET']}</td>
            </tr>
            <tr>
            <td>POST</td>
            <td>{$GLOBALS['contadorPOST']}</td>
            </tr>
            <tr>
            <td>HEAD</td>
            <td>{$GLOBALS['contadorHEAD']}</td>
            </tr>
            <tr>
            <td>INVALID</td>
            <td>{$GLOBALS['contadorInvalid']}</td>
            </tr>
            <tr>
            <td><strong>Total</strong></td>
            <td><strong>{$GLOBALS['contador']}</strong></td>
            </tr>
        </tbody>
        </table>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>

  </body>
</html>

EOD;
}

main();