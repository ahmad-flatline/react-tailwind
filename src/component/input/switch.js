import { useState } from "react";

const Switch = ({ children, checked, onCheck, id }) => {
  const [newId, setNewId] = useState(id || Math.random());

  return (
    <div className="flex items-center m-3 w-24">
      <div className="form-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onCheck(!checked)}
          id={newId}
          className="sr-only"
        />
        <label className="bg-slate-400" htmlFor={newId}>
          <span className="bg-white shadow-sm" aria-hidden="true"></span>
          <span className="sr-only">Switch label</span>
        </label>
      </div>
      <div className="text-sm text-slate-400 italic ml-2">{checked ? "On" : "Off"}</div>
    </div>
  );
};

<button type="button" role="switch" aria-checked="true" class="ant-switch ant-switch-checked">
  <div class="ant-switch-handle"></div>
  <span class="ant-switch-inner">
    <span role="img" aria-label="check" class="anticon anticon-check">
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="check"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
      </svg>
    </span>
  </span>
</button>;

export default Switch;
