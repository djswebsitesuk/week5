import React from 'react';
import logo from './logo.svg';
import './App.css';
//import TableHeader, {} from './tableHeader'
//import TableRows, {} from './tableRows'
//import TableProps from './tableProps'
//import ColumnDefinitionType from './columnDefinition'

type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
}

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

interface DataObject {
  id: number;
  title: string;
  body: string;
}

const data: DataObject[] = [
  {
    id: 1,
    title: 'post number 1',
    body: 'some latin stuff 1'
  },
  {
    id: 2,
    title: 'post number 2',
    body: 'some latin stuff 2'
  },
  {
    id: 3,
    title: 'post number 3',
    body: 'some latin stuff 3'
  }
]

const columns: ColumnDefinitionType<DataObject, keyof DataObject>[] = [
  {
    key: 'id',
    header: 'Identifier',
  },
  {
    key: 'title',
    header: 'title text',
  },
  {
    key: 'body',
    header: 'body text'
  }
]


const style = {
  borderCollapse: 'collapse'
} as const

const TableHeader = <T, K extends keyof T>({ columns }: TableProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      width: column.width ?? 300,
      borderBottom: '2px solid black'
    };

    return (
      <th
        key={`headCell-${index}`}
        style={style}
      >
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};

const TableRows = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          return (
            <td key={`cell-${index2}`} style={style}>
              {row[column.key]}
            </td>
          );
        }
        )}
      </tr>
    );
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
};

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
return (
  <table style={style}>
    <TableHeader columns={columns} data={[]} />
    <TableRows
      data={data}
      columns={columns}
    />
  </table>
);
};

function App() {
  return ( <Table data={data} columns={columns} />
  );
}

export default App;
