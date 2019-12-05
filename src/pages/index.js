/**
 * author     : jayguo
 * createTime : 2019-11-14 13:26
 */

import React, { useState } from 'react';
import { useDispatch } from 'dva';
import { Table, Form, Input, Button, Icon } from 'antd';
import { useAntdTable } from '@umijs/hooks';
import Search from '../components/Search';
import FilterBar from '../components/FilterBar';

let searchInput = null;
const STATUS = {
  1: '待审批', 2: '审批中', 3: '已否决', 4: '待接诊', 5: '已接诊',
};
const options = [{
  key: 'status',
  value: '状态',
  options: objectToArray(STATUS),
}, {
  key: 'name',
  value: '姓名',
}];
function objectToArray(obj) {
  const data = Object.entries(obj);
  return data.map(o => ({
    text: o[1],
    value: o[0],
  }));
}

const App = props => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const { tableProps, search } = useAntdTable(getList, {
    form: props.form,
  });
  tableProps.pagination.showQuickJumper = true;
  tableProps.pagination.showTotal = total => `共 ${ total } 条`;
  const { submit } = search || {};

  function getList({ current, pageSize, filters, sorter, ...rest }) {
    console.log('filters', filters);
    const params = {
      pageNo: current,
      pageSize,
      ...rest,
    };
    if (JSON.stringify(filters) !== '{}') {
      setFilters(filters);
      const arr = Object.entries(filters);
      arr.forEach(o => {
        params[o[0]] = [o[1]].join();
      });
    }
    return dispatch({
      type: 'referral/fetchList',
      payload: params,
    }).then(result => {
      if (result) {
        return {
          total: result.total,
          data: result.list,
        };
      }
    });
  }

  function callback(filters) {
    setFilters(filters);
    tableProps.onChange({}, filters); // 手动调用getList
  }

  function handleSearch(selectedKeys, dataIndex) {
    const newFilters = {
      ...filters,
      [dataIndex]: selectedKeys,
    };
    setFilters(newFilters);
    tableProps.onChange({}, newFilters); // 手动调用getList
  }

  const columns = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: text => STATUS[text],
      filters: objectToArray(STATUS),
      filteredValue: filters.status,
    }, {
      title: '患者姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={ { padding: 8 } }>
          <Input
            ref={ node => {
              searchInput = node;
            } }
            placeholder="请输入中文姓名"
            value={ selectedKeys[0] }
            onChange={ e => setSelectedKeys(e.target.value ? [e.target.value] : []) }
            onPressEnter={ () => handleSearch(selectedKeys, 'name') }
            style={ { width: 188, marginBottom: 8, display: 'block' } }
          />
          <Button
            type="primary"
            onClick={ () => handleSearch(selectedKeys, 'name') }
            icon="search"
            size="small"
            style={ { width: 90, marginRight: 8 } }
          >
            搜索
          </Button>
          <Button onClick={ clearFilters } size="small" style={ { width: 90 } }>
            取消
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={ { color: filtered ? '#1890ff' : undefined } }/>
      ),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select());
        }
      },
    }
  ];
  return <div className="list-wrap">
    <Search form={ props.form } submit={ submit }/>
    <FilterBar filters={ filters } callback={ callback } options={ options }/>
    <Table columns={ columns }
           rowKey="id"
           { ...tableProps }
           locale={ {
             emptyText: '暂无数据',
           } }
           scroll={ { y: window.document.documentElement.clientHeight - 225 } }
           size="middle"/>
  </div>;
};

export default Form.create()(App);
