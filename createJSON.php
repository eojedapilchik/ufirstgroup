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
    $ini = parse_ini_file('config_backend.ini');
    $input_filename= $ini['input_filename'];
    $output_filename = $ini['output_filename'];
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
    }
}

/**
 * Takes a String and parse it into an associative array of fields
 *
 * @param String $record_str a line of the txt file to be transformed 
 * @return Array  associative array, key => values, JSON like formatted
 */
function createJSONfromArray($record_str){
    $json_arr=[];
    
    if(!empty($record_str)){
        $date_arr= explode(":",substr($record_str[1],1,-1)); # removing trailing and leading brackets
        $request_arr = getRequestArray($record_str[2]);
        $json_arr = array(
            'host'=>$record_str[0],
            'datetime'=>array(
                "day"=>$date_arr[0],
                "hour"=>$date_arr[1],
                "minute"=>$date_arr[2],
                "second"=>$date_arr[3],
            ),
            'request'=>$request_arr,
            'response_code'=>$record_str[3],
            'document_size'=>$record_str[4]
         );
    }
    return $json_arr ; 
}

/**
 * Transform the request part into an associative array
 *
 * @param String $request_text - The request test which includes the method, url, and protocol
 * @return Array  associative array of key=>values with data of the request parsed
 */
function getRequestArray($request_text){
    $request_text =htmlspecialchars(substr($request_text,1,-1), ENT_QUOTES); #remove trailing and leading quotes
    $request_arr=preg_split("/[\s]+/",$request_text); 
    $protocol = array_pop($request_arr);
    $protocol_arr= explode("/",$protocol);
    if($protocol_arr[0]!=="HTTP"){
        $protocol_arr[0]="N/A";
        $protocol_arr[1]="";
    }
    $method = array_shift($request_arr);
    $url =  htmlspecialchars(implode(" ",$request_arr));
    $request = array(
        "method"=>$method,
        "url"=>$url,
        "protocol"=>$protocol_arr[0],
        "protocol_version"=>$protocol_arr[1],
    );                                                  
    //echo print_r($request)."<br>";
    return $request;
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

main();

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
            <td>{$contadorGET}</td>
            </tr>
            <tr>
            <td>POST</td>
            <td>{$contadorPOST}</td>
            </tr>
            <tr>
            <td>HEAD</td>
            <td>{$contadorHEAD}</td>
            </tr>
            <tr>
            <td>INVALID</td>
            <td>{$contadorInvalid}</td>
            </tr>
            <tr>
            <td><strong>Total</strong></td>
            <td><strong>{$contador}</strong></td>
            </tr>
        </tbody>
        </table>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>

  </body>
</html>

EOD;