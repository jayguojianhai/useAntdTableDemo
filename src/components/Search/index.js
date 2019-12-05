/**
 * author     : jayguo
 * createTime : 2019-12-04 19:42
 */
import React from 'react';
import { Form, Row, Col, DatePicker, Radio } from 'antd';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
export default function({ form: { getFieldDecorator }, submit }) {
  return <div className="querybar" style={ { marginBottom: '10PX' } }>
    <Form>
      <Row className="querybar" gutter={ 16 }>
        <Col span={ 4 }>
          { getFieldDecorator('direction', {
            initialValue: '1',
            onChange: submit,
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="1">转出</Radio.Button>
              <Radio.Button value="2">转入</Radio.Button>
            </Radio.Group>,
          ) }
        </Col>
        <Col span={ 8 } offset={ 12 }>
          <FormItem
            { ...formItemLayout }
            label="按申请时间筛选">
            {
              getFieldDecorator('time', {
                onChange: submit,
              })(
                <RangePicker/>,
              )
            }
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>;
}
