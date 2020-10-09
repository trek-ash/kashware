module.exports = {
    TEST_THUMBNAIL_URL: "http://i3.ytimg.com/vi/kl/mqdefault.jpg" ,
    TEST_JSON:{
                        "baz": "qux",
                        "foo": "bar"
                    },
    TEST_JSONPATCH:[
                        { "op": "replace", "path": "/baz", "value": "boo" },
                        { "op": "add", "path": "/hello", "value": ["world"] },
                        { "op": "remove", "path": "/foo" }
                    ] 
}