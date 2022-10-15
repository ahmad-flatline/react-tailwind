/* eslint-disable react-hooks/exhaustive-deps */
import { renderToString } from "react-dom/server";
import React, { useEffect, useState } from "react";

const TransitionContainer = ({ children, className, base, enter, update, exit, time, ...props }) => {
  const [elements, setElements] = useState(null);
  const [currentClass, setCurrentClass] = useState("");
  const [index, setIndex] = useState(-1);

  const prepareChildren = (children) => {
    let newChildren = children;

    if (typeof children === "function") newChildren = [children()];
    else if (!Array.isArray(children)) newChildren = [children];

    return newChildren.filter((child) => child);
  };

  const compareComponents = (component1, component2) => {
    if (component1 === component2) return true;
    else if (component1?.props && component2?.props) {
      if (component1.props === component2.props) return true;
      else if (component1.props.children === component2.props.children) return true;
    }

    return renderToString(component1) === renderToString(component2);
  };

  useEffect(() => {
    const newChildren = prepareChildren(children);

    if (!elements) setElements(newChildren);
    else {
      if (elements.length < newChildren.length) {
        setCurrentClass(enter);
        setIndex(elements.length);
        setElements(newChildren);
        setTimeout(() => setIndex(-1) + setCurrentClass(""), 50);
      } else {
        if (elements.length > newChildren.length) setCurrentClass(exit);
        else setCurrentClass(update);

        setIndex(elements.findIndex((child) => !newChildren.find((c) => compareComponents(child, c))));

        // setTimeout(() => setCurrentClass(""), time - 50);

        setTimeout(() => {
          setCurrentClass("");
          setIndex(-1);
          console.log("Done");
          setElements(newChildren);
        }, time);
      }
    }
  }, [children]);

  return (
    <props.tag className={className}>
      {React.Children.map(elements, (ch, i) =>
        React.cloneElement(ch, {
          className: `${ch.props.className || ""} ${base} ${i === index ? currentClass : ""}`,
        })
      )}
    </props.tag>
  );
};

TransitionContainer.defaultProps = {
  tag: "div",
  className: "",
  base: "",
  enter: "",
  update: "",
  exit: "",
  time: 100,
};
export default TransitionContainer;
