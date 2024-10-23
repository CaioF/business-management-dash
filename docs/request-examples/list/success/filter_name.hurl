POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,filter_name.json;

HTTP 200

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == true
jsonpath "$.errors" count == 0

bytes == file,filter_name_response.json;