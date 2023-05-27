import columnList from '../lib/userColumns';

type columnListArr = typeof columnList;
type columnList = number;

export default function ItemTR({ obj, columnList }:{obj:any,columnList:columnListArr}) {
  return <>
    {columnList.map(column => <td key={column.name}>
      {column?.wrap ? <column.wrap value={column.getVal(obj)} /> : column.getVal(obj)}
    </td>)}
  </>
}