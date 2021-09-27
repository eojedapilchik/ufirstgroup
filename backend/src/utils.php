<?php

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
    $http_methods=['GET','PUT','HEAD','PATCH','DELETE','POST'];
    $request_text =htmlspecialchars(substr($request_text,1,-1), ENT_QUOTES); #remove trailing and leading quotes
    $request_arr=preg_split("/[\s]+/",$request_text); 
    $protocol = end($request_arr);
    $protocol_arr= explode("/",$protocol);
    if(!empty($protocol_arr) && $protocol_arr[0]=="HTTP"){
        array_pop($request_arr);
    }else{
        $protocol_arr[0]="N/A";
        $protocol_arr[1]="";
    }
    if(in_array($request_arr[0],$http_methods)){
        $method=$request_arr[0];
        array_shift($request_arr);
    }else{
        $method="N/A";
    }
    $url =  implode(" ",$request_arr);
    $request = array(
        "method"=>$method,
        "url"=>$url,
        "protocol"=>$protocol_arr[0],
        "protocol_version"=>$protocol_arr[1],
    );                                                  
    //echo print_r($request)."<br>";
    return $request;
}