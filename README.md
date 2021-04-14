# jgame

Jgame is a javascript front-end library, to do
animations, and add more tags for the classic html.

# Link

To add jgame functions to your
project you can use this code

```
<script type="module" src="jgame.js"></script>
```

# Examples

## Fire

This is the html code to create
a fire animation.

```
<animation id="hello"></animation>
<script>jgame.fire("hello")</script>
```

## Range

This is how you can create a table
range

```
<range id="hello"></range>
<script>jgame.range("hello", 3, 3)</script>
```

and the result will be this:

1|2|3
--|--|--
4|5|6
7|8|9

If you want you can add a style:

```
<range id="hello"></range>
<script>jgame.range("hello", 3, 3, 40, 40, "color: red;")</script>
```

The first paramter is the id of the element, the second
one is the start of the range, the third is the end, tje fourth
is the width of the table, and the fifth is the height. And the last
one is the style that will be aplicate to every number.

You can also add a conditional with the special characte "$" the will be replaced
by the actual number. Follow the example:

```
<range id="hello"></range>
<script>
  const color = "color: red;"
  jgame.range("hello", 3, 3, 40, 40, `$ == 1 ? ${color} : ""`)
</script>
```

## Camera

To use the camera you can the function Start camera whith the paramters:
id: the id element, audio: true or false and video: true or false.

```
<video id="hello"></video>
<script>
  jgame.StartCamera("hello", true, true)
</script>
```

