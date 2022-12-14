/* eslint-disable react-hooks/exhaustive-deps */
import { renderToString } from "react-dom/server";
import React, { useEffect, useState } from "react";

const TransitionContainer = ({ children, className, base, enter, update, exit, time, ...props }) => {
  const [elements, setElements] = useState(null);
  const [shallowElements, setShallowElements] = useState(null);
  const [activeElement, setActiveElement] = useState({ index: -1, class: "" });

  const prepareChildren = (children) => {
    let newChildren = children;

    if (typeof children === "function") newChildren = [children()];
    else if (!Array.isArray(children)) newChildren = [children];

    return newChildren.filter((child) => child);
  };

  const getClasses = (class1 = "", class2 = "") => ({ className: `${class1} ${base} ${class2}` });

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
        setActiveElement({ index: elements.length, class: enter });
        setElements(newChildren);
        setTimeout(() => setActiveElement({ index: -1, class: "" }), 20);
      } else {
        const index = elements.findIndex((child) => !newChildren.find((c) => compareComponents(child, c)));

        if (elements.length > newChildren.length) setActiveElement({ index, class: exit });
        else setActiveElement({ index, class: update });

        setTimeout(() => {
          setActiveElement({ index: -1, class: "" });
          setShallowElements(
            React.Children.map(newChildren, (ch, i) => React.cloneElement(ch, getClasses(ch.props.className)))
          );
          setTimeout(() => {
            setElements(newChildren);
            setShallowElements(null);
          }, 20);
        }, time);
      }
    }
  }, [children]);

  return (
    <props.tag className={className}>
      {!shallowElements &&
        React.Children.map(elements, (ch, i) =>
          React.cloneElement(
            ch,
            getClasses(ch.props.className, i === activeElement.index ? activeElement.class : "")
          )
        )}

      {shallowElements || null}
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
