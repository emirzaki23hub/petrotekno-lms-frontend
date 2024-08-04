import * as React from "react";
import { SVGProps } from "react";

const IconSearch: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Spread props to allow additional SVG props
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.38959 3.24188C7.02405 3.24188 5.71443 3.7843 4.74885 4.74984C3.78327 5.71536 3.24081 7.02491 3.24081 8.39037C3.24081 9.75584 3.78327 11.0654 4.74885 12.0309C5.71443 12.9964 7.02405 13.5389 8.38959 13.5389C9.75513 13.5389 11.0647 12.9964 12.0303 12.0309C12.9959 11.0654 13.5384 9.75584 13.5384 8.39037C13.5384 7.02491 12.9959 5.71536 12.0303 4.74984C11.0647 3.7843 9.75513 3.24188 8.38959 3.24188ZM0.666415 8.39037C0.66626 7.17494 0.953 5.97664 1.50331 4.89292C2.05363 3.8092 2.85197 2.87067 3.83343 2.15365C4.81488 1.43662 5.95172 0.961365 7.1515 0.766521C8.35127 0.571678 9.5801 0.662751 10.738 1.03233C11.896 1.40192 12.9503 2.03958 13.8153 2.89345C14.6803 3.74732 15.3316 4.79329 15.7161 5.94629C16.1006 7.0993 16.2076 8.32678 16.0282 9.5289C15.8489 10.731 15.3883 11.8738 14.684 12.8644L16.9718 15.152C17.2063 15.3948 17.3361 15.7199 17.3331 16.0574C17.3302 16.3949 17.1948 16.7177 16.9562 16.9563C16.7175 17.195 16.3947 17.3304 16.0572 17.3333C15.7197 17.3362 15.3945 17.2065 15.1517 16.972L12.8652 14.6857C11.7097 15.5072 10.3504 15.9949 8.93623 16.0952C7.52203 16.1956 6.10748 15.9047 4.84761 15.2546C3.58774 14.6044 2.53116 13.62 1.79364 12.4092C1.05613 11.1985 0.66614 9.80805 0.666415 8.39037Z"
      fill="currentColor"
    />
  </svg>
);

export default IconSearch;