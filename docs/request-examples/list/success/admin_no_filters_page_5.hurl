POST http://{{host}}:{{port}}/list
Content-Type: application/json
file,admin_no_filters_page_5.json;

HTTP 200

[Asserts]

header "Content-Type" == "application/json; charset=utf-8"

jsonpath "$.ok" == true
jsonpath "$.errors" count == 0

bytes == file,admin_no_filters_page_5_response.json;