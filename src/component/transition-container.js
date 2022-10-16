/* eslint-disable react-hooks/exhaustive-deps */
import { renderToString } from "react-dom/server";
import React, { useEffect, useState } from "react";

const TransitionContainer = ({ children, className, base, enter, update, exit, time, ...props }) => {
  const [elements, setElements] = useState(null);
  const [activeClass, setActiveClass] = useState("");
  const [index, setIndex] = useState(-1);
  // const [animating, setAnimating] = useState(true);

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
        setActiveClass(enter);
        setIndex(elements.length);
        setElements(newChildren);
        setTimeout(() => setIndex(-1) + setActiveClass(""), 50);
      } else {
        if (elements.length > newChildren.length) setActiveClass(exit);
        else setActiveClass(update);

        setIndex(elements.findIndex((child) => !newChildren.find((c) => compareComponents(child, c))));

        setTimeout(() => {
          setActiveClass("");
          setIndex(-1);
          setElements(newChildren);
        }, time);
      }
    }
  }, [children]);

  return (
    <props.tag className={className}>
      {React.Children.map(elements, (ch, i) =>
        React.cloneElement(ch, {
          className: `${ch.props.className || ""} ${base} ${i === index ? activeClass : ""}`,
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
