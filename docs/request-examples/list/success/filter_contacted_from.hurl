POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,filter_contacted_from.json;

HTTP 200

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == true
jsonpath "$.errors" count == 0

bytes == file,filter_contacted_from_response.json;