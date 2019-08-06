import {stasis, renderer} from "@joshuafcole/fluorine";

interface State {
  count: number;
}

let _state: State = {
  count: 0
};

export let {state, log, mutate} = stasis(_state, (tx) => {
  if (STASIS.debug === true) {
    console.group(`State Mutation [${tx.source}]`);
    for (let change of tx.changes) {
      console.log(change.currentPath, change.previousValue, "->", change.newValue);
    }
    console.groupEnd();
  }
  renderer.redraw();
});

const STASIS = ((window as any).STASIS = {state, log, mutate, debug: false});
