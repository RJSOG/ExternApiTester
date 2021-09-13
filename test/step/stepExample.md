{
    "groupname" : "foo",
    "all_test" : [
        {
            "id" : "e1",
            "name" : "foo",
            "description" : "Basic description",
            "endpoint" : "/endpoint",
            "method": "HTTP METHOD",
            "param_uri" : {},
            "param_body" : [{}],
            "assert" : [
                {
                    "comparison" : "Equals", 
                    "target" : "data.foo",
                    "value" : foo
                }
            ]
        }
    ]
}