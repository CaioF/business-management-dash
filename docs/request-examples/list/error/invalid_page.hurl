POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,invalid_page.json;

HTTP 400

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == false
jsonpath "$.errors" count == 1
jsonpath "$.errors[0]" == "Page must be a number"
