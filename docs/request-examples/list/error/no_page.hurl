POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,no_page.json;

HTTP 400

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == false
jsonpath "$.errors" count == 2
jsonpath "$.errors[0]" == "Page cannot be empty"
jsonpath "$.errors[1]" == "Page must be a number"
