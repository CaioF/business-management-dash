POST http://{{host}}:{{port}}/mark-as-contacted
Content-Type: application/json
file,invalid_business.json;

HTTP 400

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == false
jsonpath "$.errors" count == 1
jsonpath "$.errors[0]" == "Business ID must be a number"
jsonpath "$.businessId" == 0