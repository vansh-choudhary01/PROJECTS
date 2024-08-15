hljs.highlightAll();

document.addEventListener("DOMContentLoaded", function () {
  brython();
});

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: "python",
  theme: "default",
});

function runCode() {
  var code = editor.getValue();
  try {
    var output = __BRYTHON__.python_to_js(code);
    document.getElementById("output").innerText = eval(output);
  } catch (e) {
    document.getElementById("output").innerText = e;
  }
}
