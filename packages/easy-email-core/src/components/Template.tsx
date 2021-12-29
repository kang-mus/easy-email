import { flatMap, isArray, omit } from 'lodash';
import { BasicType } from '@core/constants';
import { IBlockData, RecursivePartial } from '@core/typings';
import React from 'react';
import MjmlBlock from '@core/components/MjmlBlock';
import { ITemplate } from '@core/blocks';

export type TemplateProps = RecursivePartial<ITemplate['data']> &
  RecursivePartial<ITemplate['attributes']> & {
    children:
    | string
    | React.ReactElement
    | React.ReactElement[]
    | IBlockData
    | IBlockData[];
    idx?: string | null;
  };

export function Template(props: TemplateProps) {
  let formatChildren = props.children;

  if (Array.isArray(formatChildren)) {
    formatChildren = flatMap(formatChildren);
  }

  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      type={BasicType.TEMPLATE}
      value={props.value}
    >
      {formatChildren}
    </MjmlBlock>
  );
}
