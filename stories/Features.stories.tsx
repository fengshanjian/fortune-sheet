import React, { useState, useCallback, useRef } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Sheet } from "@fortune-sheet/core";
import { Workbook } from "@fortune-sheet/react";
import cell from "./data/cell";
import formula from "./data/formula";
import { emptyData, emptyData1, emptyData2 } from "./data/empty";
import freeze from "./data/freeze";
import dataVerification from "./data/dataVerification";
import lockcellData from "./data/protected";

export default {
  component: Workbook,
} as Meta<typeof Workbook>;

const Template: StoryFn<typeof Workbook> = ({
  // eslint-disable-next-line react/prop-types
  data: data0,
  ...args
}) => {
  const [data, setData] = useState<Sheet[]>(data0);

  const ref = useRef(null);
  const onChange = useCallback((d: Sheet[]) => {
    setData(d);
    console.log(d);
  }, []);
  const onPreHandler = useCallback((sheetd, patches) => {
    // sheetd[0].data[0][1] = {
    //   v: "hello world",
    //   m: "hello world",
    // };
    // console.log(patches);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Workbook
        ref={ref}
        {...args}
        data={data}
        onChange={onChange}
        preHandler={onPreHandler}
      />
    </div>
  );
};

export const Basic = Template.bind({});
// @ts-ignore
Basic.args = { data: [cell] };

export const Formula = Template.bind({});
// @ts-ignore
Formula.args = { data: [formula] };

export const Empty = Template.bind({});
Empty.args = { data: [emptyData, emptyData1, emptyData2] };

export const Tabs = Template.bind({});
// @ts-ignore
Tabs.args = { data: [cell, formula] };

export const Freeze = Template.bind({});
// @ts-ignore
Freeze.args = { data: [freeze] };

export const DataVerification = Template.bind({});
// @ts-ignore
DataVerification.args = { data: [dataVerification] };

export const ProtectedSheet = Template.bind({});
// @ts-ignore
ProtectedSheet.args = {
  data: lockcellData,
};

export const MultiInstance: StoryFn<typeof Workbook> = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: "50%",
          height: "100%",
          paddingRight: "12px",
          boxSizing: "border-box",
        }}
      >
        <Workbook data={[emptyData, emptyData1, emptyData2]} />
      </div>
      <div
        style={{
          display: "inline-block",
          width: "50%",
          height: "100%",
          paddingLeft: "12px",
          boxSizing: "border-box",
        }}
      >
        <Workbook data={[emptyData, emptyData1, emptyData2]} />
      </div>
    </div>
  );
};
