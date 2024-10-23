POST http://{{host}}:{{port}}/mark-as-contacted
Content-Type: application/json
file,inexistent_business.json;

HTTP 404

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == false
jsonpath "$.errors" count == 1
jsonpath "$.errors[0]" == "Business not found"
jsonpath "$.businessId" == 0