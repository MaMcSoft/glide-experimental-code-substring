# Glide Experimental Code Template

This is a sample and template for implementing your own Experimental Code column.  It's a fully functional implementation of a simple substring column.

## Getting started

The first thing to do is to fork [this repl](https://replit.com/@MarkProbst/glide-experimental-code-substring#README.md) so you have your own copy of it that you can modify.  You can then try the URL of your copy (you should see it in the mini-browser on your right) in Glide.  Just make sure to delete any columns you made with it, and reload Glide before you move on.

To implement your own column you only have to change two files:

* `glide.json` contains metadata about your function, such as its name, a description, what parameters it takes, and what kind of result it produces.
* `function.js` is the actual JavaScript code of your column.

The `glide.json` file should be mostly self-explanatory, except for the `type`s.  These are what's allowed:

* `string`, `number`, and `boolean` are the basic primitive types.  If you declare a parameter of this type, Glide will convert whichever values are passed in to that declared JavaScript type, i.e. if you declare a parameter as `number`, then you can be sure that the value is a JavaScript number (or `undefined`, which can happen for any parameter).
* `primitive` is special in that it doesn’t convert the values, as far as that is possible.  For example, if you have a boolean column with a string value of `"True"`, if you declare a parameter as `boolean`, Glide will pass it as the boolean `true`, but if you declare it as `primitive`, Glide will pass the string `"True"`.
* `uri`, `image-uri`, `audio-uri`, `date-time`, `markdown`, `phone-number`, `email-address`, and `emoji` are string types, i.e. Glide will pass them as strings to your code, and you have to return them as strings, but Glide treats them specially.  For example, if your computed column declares that it returns `date-time`, then you can use all the date/time comparison operators on the result.
* Arrays of primitive values are declared as, for example `{ "kind": "array", "items": "string" }`, which declares an array of strings.

The implementation file has comments explaining it.

If you make a change to your `glide.json` or code when you’re building your column, click the “Reload” button in the column configurator in Glide, which causes Glide to unload your old manifest and code.  If you don’t, you won’t see your changes take effect in the Data Editor.
