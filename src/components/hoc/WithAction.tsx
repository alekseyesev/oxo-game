import React from "react";
import { Action, Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { play } from "../../redux/actions";
import Button from "../../components/Button";

const gameStatusSelector = createSelector(
  (store: store): gameStatus => store.progress.status,
  (status: gameStatus): gameStatus => status
);

const WithAction: Function = (
  Component: React.FC<any>,
  action: gameStatus
): React.FC<IButtonProps> => {
  const ComponentWithAction: React.FC<
    IButtonProps | any
  > | null = componentProps => {
    const isButton: boolean = Component === Button;
    const gameStatus: gameStatus = useSelector(gameStatusSelector);
    const additionalClasses: Array<string> = [
      (isButton ? "button_" : "") +
        action.replace(/([A-Z]{1})/g, "-$&").toLocaleLowerCase()
    ];
    const dispatch: Dispatch<Action> = useDispatch();

    if (isButton) {
      let onClick: Function;
      switch (action) {
        case "ready":
          onClick = () => dispatch(play());
          break;
        default:
          onClick = () => {};
          break;
      }
      componentProps = { ...componentProps, onClick };
    }

    return (
      (action === gameStatus && (
        <Component
          {...componentProps}
          additionalClasses={
            (componentProps.additionalClasses &&
              additionalClasses.concat(componentProps.additionalClasses)) ||
            additionalClasses
          }
        />
      )) ||
      null
    );
  };
  return ComponentWithAction;
};

export default WithAction;
