import {renderer, handle, get, FElement} from "@joshuafcole/fluorine";

import {state, mutate} from "./state";
import * as ui from "./components";
import "./base.styl";

function increment() {
  mutate(function increment(mut) {
    mut.count += 1;
  });
}

export function Shell() {
  return (
    <div class="shell">
      <ui.Col class="main">
        Hello, World!
        <button click={handle(increment)}>{state.count}</button>
      </ui.Col>
    </div>
  );
}
