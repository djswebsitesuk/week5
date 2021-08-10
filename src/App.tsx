import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Alert from 'react-bootstrap/Alert'

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
};

interface CommentDataObject {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}


const columns: ColumnDefinitionType<DataObject, keyof DataObject>[] = [
  {
    key: 'id',
    header: 'Identifier',
  },
  {
    key: 'title',
    header: 'title text',
    width: 400
  },
  {
    key: 'body',
    header: 'body text',
    width: 600
  }
]

const commentColumns: ColumnDefinitionType<CommentDataObject, keyof CommentDataObject>[] = [
  {
    key: 'postId',
    header: 'comment id',
  },
  {
    key: 'email',
    header: 'email',
    width: 400
  },
  {
    key: 'body',
    header: 'comment details',
    width: 600
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

const handleClick = async (e: any) => {
  var dataResponseForPost = fetch(`https://jsonplaceholder.typicode.com/posts/${e}/comments`)
    .then((response) => response.json())
    .then(dataResponseForPost => {
      showComments(dataResponseForPost);
    })
}

const showComments = (comment: any) =>
{
  alert("I want to show table as boot strap alert");
  let commentRow: Array<CommentDataObject> = []
  const postData: CommentDataObject[] = []
  for (var j = 0; j < comment.length; j++) {
    postData[j] = comment[j];
    var rowData = { id: postData[j].id, postId: postData[j].postId, name: postData[j].name, email: postData[j].email, body: postData[j].body }
    commentRow.push(rowData)
  }
  return <Alert><Table data={postData} columns={commentColumns} /></Alert>
}

const TableRows = <T, K extends keyof T>({ data, columns}: TableProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`} onClick={() => handleClick(index)} >
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

function App(this: any) {
  const [posts, setPosts] = useState([]);
  const data: DataObject[] = []

  const getData = async () => {
    var dataResponse = fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then(dataResponse => {
        setPosts(dataResponse);
      })
  }


  for (var i = 0; i < posts.length; i++) {
    data[i] = posts[i];

    let rows: Array<DataObject> = []
    rows.push({/* userId: data[i].userId, */ id: data[i].id, title: data[i].title, body: data[i].body })
  }

  useEffect(() => {
    getData()
  }, [])

  return ( <Table data={data} columns={columns} />
  );
}

export default App;
