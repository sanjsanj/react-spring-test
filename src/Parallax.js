// Inspired by Corey Haggards "Screeners"
// https://dribbble.com/shots/4138489-Screeners

import React from "react";
import { Parallax } from "react-spring/renderprops-addons";
import "promise-polyfill/src/polyfill";
import "@babel/polyfill";
import "core-js/fn/symbol/iterator.js";
import "core-js/es6/symbol.js";

import "./Parallax.css";

const Page = ({ offset, caption, first, second, gradient, onClick }) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
      <div className="slopeBegin" />
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`slopeEnd ${gradient}`} />
    </Parallax.Layer>

    <Parallax.Layer className="text number" offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </Parallax.Layer>

    <Parallax.Layer className="text header" offset={offset} speed={0.4}>
      <span>
        <p style={{ fontSize: 20 }}>{caption}</p>
        <div className={`stripe ${gradient}`} />
        <p>{first}</p>
        <p>{second}</p>
      </span>
    </Parallax.Layer>
  </React.Fragment>
);

export default class extends React.Component {
  constructor(props) {
    super(props);
    if (!Object.entries)
      Object.entries = function(obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
        while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
      };
  }

  scroll = to => this.refs.parallax.scrollTo(to);
  render() {
    return (
      <div
        style={{
          gridColumn: "span 2",
          gridRow: "span 2",
          background: "#dfdfdf",
        }}
      >
        <Parallax
          className="container"
          ref="parallax"
          pages={3}
          // horizontal
          // scrolling={false}
        >
          <Page
            offset={0}
            gradient="pink"
            caption="who we are"
            first="Lorem ipsum"
            second="dolor sit"
            onClick={() => this.scroll(1)}
          />
          <Page
            offset={1}
            gradient="teal"
            caption="what we do"
            first="consectetur"
            second="adipiscing elit"
            onClick={() => this.scroll(2)}
          />
          <Page
            offset={2}
            gradient="tomato"
            caption="what we want"
            first="Morbi quis"
            second="est dignissim"
            onClick={() => this.scroll(0)}
          />
        </Parallax>
      </div>
    );
  }
}
