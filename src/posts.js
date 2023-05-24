import React from 'react';
import { Create, List, Datagrid, TextField, ReferenceField, EditButton, FunctionField } from 'react-admin';
import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput, LongTextInput} from 'react-admin';
import { DeleteButton, UrlField, FileField, FileInput, Show, SimpleShowLayout, DateField, RichTextField } from 'react-admin';

export const PostList = props => (
    <List title={<span>案件清單</span>} {...props}>
        <Datagrid rowClick="show">
            <TextField source="tag" label="案件代號"/>
            <TextField source="title" label="案件名稱"/>
            <TextField source="name" label="貸款人"/>
            <EditButton label=""/>
	    <DeleteButton label=""/>
        </Datagrid>
    </List>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="案件代號" source="id"/>
            <TextInput label="案件名稱" source="title"/>
            <TextInput label="貸款人" source="name"/>
            <TextInput label="貸款人帳號" source="user"/>
            <TextInput label="場址資料" source="factory"/>
            <TextInput label="主要銷路" source="market"/>
            <TextInput label="申請金額" source="amount"/>
            <TextInput label="案件進度" source="progress"/>
            <FileInput source="file" multiple label="書面資料" accept="application/pdf" >
	        <FileField source="file" title="some data"  />
	    </FileInput>
        </SimpleForm>
    </Create>
);

export const PostEdit = props => (
      <Edit {...props}>
          <SimpleForm>
             <TextInput disabled source="tag" label="案件代號" />
             <TextInput source="title" label="案件名稱" />
             <TextInput disabled source="date" label="申請日期" />
             <TextInput label="貸款人" source="name"/>
             <TextInput disabled source="paperwork" label="書面資料" />
             <TextInput source="factory" label="廠址資料" />
             <TextInput source="market" label="主要銷路" />
             <TextInput source="amount" label="申請金額" />
          </SimpleForm>
      </Edit>
);

export class PostShow extends React.Component {
  state = {
    loading: true,
    data: null
  };

  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data, loading: false });
    // this.setState({ data: [{Id: "002", "案件代號": "BCSLC001"}], loading: false });
  }

  PostTitle = ({ record }) => {
        return <span><span>案件代號: {record ? `${record.tag}` : ''}</span> <span>案件名稱: {record ? `${record.title}` : ''}</span></span>;
  };

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.data) {
      return <div>didn't get a data</div>;
    }
    // Data
    return (
    <Show title={< this.PostTitle/>} {...this.props}>
        <SimpleShowLayout>
            <TextField label="案件代號" source="tag"/>
            <TextField label="案件名稱" source="title"/>
            <TextField label="貸款人" source="name"/>
            <TextField label="貸款人帳號" source="user"/>
            <TextField label="場址資料" source="factory"/>
            <TextField label="主要銷路" source="market"/>
            <TextField label="申請日期" source="date"/>
            <TextField label="申請金額" source="amount"/>
            <TextField label="案件進度" source="progress"/>
            <UrlField label="書面資料" className="書面資料" source="paperwork" />
            <ReferenceField label="區塊鏈資料" source="id" reference="bcpost" linkType="show">
                <TextField source="imghash" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);
  }
}
