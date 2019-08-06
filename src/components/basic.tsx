import {Renderer, FElement, FChild} from "@joshuafcole/fluorine";
import cc from "classcat";

export function Row(props: FElement, children?: (FChild | FChild[])[]) {
  return (
    <div {...props} class={cc(["fui-row", props.class])}>
      {children}
    </div>
  );
}

export function Col(props: FElement, children?: (FChild | FChild[])[]) {
  return (
    <div {...props} class={cc(["fui-col", props.class])}>
      {children}
    </div>
  );
}

export interface IconProps extends FElement {
  ion: string;
}
export function Icon(props: IconProps) {
  return <i {...props} class={cc(["fui-icon icon", `ion-${props.ion}`])} />;
}

// export interface GridProps extends FElement {
//   /** Defines how unpositioned children place in the grid.
//    * row - children fill in vertically, wrapping to the next column
//    * column - children fill horizontally, wrapping to the next row */
//   flow: "row"|"column";
//   /** Should children greedily pack into the first opening they'd fit in? */
//   pack?: boolean;
//
// }
// export function Grid(props: GridProps, children?: (FChild | FChild[])[]) {
// }
