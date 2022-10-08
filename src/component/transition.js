/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const Transition = ({ base, enter, exit, time, open, deleted, remove, ...props }) => {
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (deleted) {
      setEnd(exit);
      if (remove) setTimeout(remove, time);
    }
  }, [deleted]);

  useEffect(() => {
    if (!remove) {
      if (open) setEnd(enter);
      else if (!open) setEnd(exit);
    }
  }, [open]);

  return (
    <props.tag className={`${remove && enter} ${base} transition-all duration-${time} ${end}`}>
      {props.children}
    </props.tag>
  );
};

Transition.defaultProps = { tag: "div", base: "", enter: "", exit: "", time: 100 };
export default Transition;
