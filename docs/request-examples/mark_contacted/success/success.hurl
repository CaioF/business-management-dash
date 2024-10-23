POST http://{{host}}:{{port}}/mark-as-contacted
Content-Type: application/json
file,success.json;

HTTP 200

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == true
jsonpath "$.errors" count == 0
jsonpath "$.businessId" == "2"