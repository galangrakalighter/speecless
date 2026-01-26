/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      behavior?: string;
      direction?: string;
      scrollamount?: string | number;
      scrolldelay?: string | number;
      loop?: string | number;
      bgcolor?: string;
      height?: string | number;
      width?: string | number;
      hspace?: string | number;
      vspace?: string | number;
    };
  }
}
