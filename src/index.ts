import {renderer} from "@joshuafcole/fluorine";
import {Shell} from "./client";

//-----------------------------------------------------
// Rendering
//-----------------------------------------------------

renderer.render_roots = () => [Shell()];

window.addEventListener("load", function() {
  document.body.appendChild(renderer.container);
  renderer.redraw();
});

if(module.hot) {
  module.hot.accept("./client", () => {
    (Shell as any) = require("./client").Shell;
    renderer.redraw();
  });
}
