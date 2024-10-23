POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,filter_review_greater_page_2.json;

HTTP 200

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == true
jsonpath "$.errors" count == 0

bytes == file,filter_review_greater_page_2_response.json;