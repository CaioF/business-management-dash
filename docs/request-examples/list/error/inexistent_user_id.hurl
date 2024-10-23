POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,inexistent_user_id.json;

HTTP 200

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == true
jsonpath "$.errors" count == 0
jsonpath "$.businesses" count == 0