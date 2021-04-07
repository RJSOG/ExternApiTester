{
    "name" : "foo",
    "automatedAuth" : true / false,
    "serieIsEnabled" : true / false,
    "description" : "Basic Description",
    "executionOrder" : [
        {
            "file" : "fileStep1.json",
            "id" : "f1" --> ID of the step to be executed,
            "requiredStep" : true / false
        },
        {
            "file" : "fileStep2.json",
            "id" : "f2"
            "requiredStep" : true / false,
            "assert" : [
                {
                    "comparison" : "Contain",
                    "target" : "data.item",
                    "value" : "f1.param_body"
                }
            ]
        }
    ]
}