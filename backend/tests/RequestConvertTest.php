<?php
 
use PHPUnit\Framework\TestCase;
class RequestConvertTest extends TestCase{

    public  function testSimpleFullResquestStringIsConverted(){
        require "src/utils.php";

        $text = "'GET / HTTP/1.0'";
        $proper_response = array(
        "method"=>"GET",
        "url"=>"/",
        "protocol"=>"HTTP",
        "protocol_version"=>"1.0",
    );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }

    public  function testResquestStringWithSpacesNoProtocolIsConvertedToArray(){
        $text = '"GET /docs/Access/chapter6/s1-1.html>National Library Network Program"';
        $proper_response = array(
        "method"=>"GET",
        "url"=>htmlspecialchars("/docs/Access/chapter6/s1-1.html>National Library Network Program",ENT_QUOTES),
        "protocol"=>"N/A",
        "protocol_version"=>"",
        );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }

    public  function testResquestStringWithSpacesNoProtocolAndHtmlTags(){
        $text ='"GET /docs/Access/chapter6/s1-1.html>National Library Network Program</a><br><ul>"';
        $proper_response = array(
        "method"=>"GET",
        "url"=>htmlspecialchars("/docs/Access/chapter6/s1-1.html>National Library Network Program</a><br><ul>",ENT_QUOTES),
        "protocol"=>"N/A",
        "protocol_version"=>"",
        );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }

    public  function testResquestStringWithOnlyProtocolAndRootUrl(){
        $text ='"GET /"';
        $proper_response = array(
        "method"=>"GET",
        "url"=>htmlspecialchars("/",ENT_QUOTES),
        "protocol"=>"N/A",
        "protocol_version"=>"",
        );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }

    public  function testResquestStringWithOnlyUrl(){
        $text ='"cons/circle_logo_small.gif"';
        $proper_response = array(
        "url"=>htmlspecialchars("cons/circle_logo_small.gif",ENT_QUOTES),
        "protocol"=>"N/A",
        "protocol_version"=>"",
        "method"=>"N/A"
        );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }
    public  function testResquestStringWithOnlyProtocolWithVersion(){
        $text ='"HTTP/1.0"';
        $proper_response = array(
        "method"=>"N/A",
        "protocol_version"=>"1.0",
        "protocol"=>"HTTP",
        "url"=>""
        );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }
    public  function testResquestStringWithOnlyMethod(){
        $text ='"GET"';
        $proper_response = array(
        "method"=>"GET",
        "protocol_version"=>"",
        "protocol"=>"N/A",
        "url"=>""
        );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }

    public  function testResquestStringWithOnlyProtocolNoVersion(){
        $text ='"HTTP"';
        $proper_response = array(
        "method"=>"N/A",
        "protocol_version"=>"",
        "protocol"=>"HTTP",
        "url"=>""
        );        
        $this->assertEquals($proper_response,getRequestArray($text));
    }
}