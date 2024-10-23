POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,invalid_date.json;

HTTP 400

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == false
jsonpath "$.errors" count == 1
jsonpath "$.errors[0]" == "Minimum contact date must be a date"
