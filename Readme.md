# UFirstGroup Data Visualization Assigment

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/eojedapilchik/ufirstgroup)

Web application that reads a TXT file containing a day's worth of all HTTP requests to the EPA WWW server located at Research Triangle Park, NC.  
Data is parsed to a JSON file and is read from the Frontend index.html
The logs were collected from 23:53:25 EDT on Tuesday, August 29 1995 through 23:53:07 on
Wednesday, August 30 1995, a total of 24 hours.

#### Acknowledgements

The logs were collected by Laura Bottomley (laurab@ee.duke.edu) of Duke University.

## Configuration

#### Backend:

config_backend.ini file:

```sh
input_filename= "epa-http.txt";
output_filename = "data_json.json";
```

Input File where to read from (TXT of requests log)
Out File where JSON data will be stored

#### Frontend:

file: File to read JSON.  
year: The year to used for datetime parsing. 1995  
month: The month to be used for datetime parsing. August (logs corresponds to August)  
partitions: Number of partitions (bins) to be used for the Histogram.  
max_bytes_size: Max size in bytes to be used for Statistics calculations and Charting  
bean_size : size of each bin of the histogram.  
defaultColors: list of colors in hex code, to be used for the background of the charts.

## Usage

1. Execute the Backend file proccessing by directly accessing this link:  
   https://eojedapilchik.com/ufirstgroup/createJSON.php
2. Open the website:  
   https://eojedapilchik.com/ufirstgroup/index.html

Access to the backend is also available clicking the Blue button: Process File - Backend.

JSON File can be accessed from the gray button: Open JSON file.

## Creator

Alcides Ojeda  
19-Sept-2021
