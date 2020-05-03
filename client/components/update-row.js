import React from 'react'
import {connect} from 'react-redux'
import {Modal, Form, Input, Select, Button} from 'antd'
import {fetchBills, postBill} from '../store/bills'

class UpdateRow extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {visible: false}

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleSubmit(value) {
    const newBill = {
      price: value.amount,
      note: value.memo,
    }

    this.props.postBill({value}, this.props.tripId)

    console.log('Success:', value)
  }

  // handleOk = (e) => {
  //   console.log(e)

  //   this.setState({
  //     visible: false,
  //   })
  // }

  // handleCancel = (e) => {
  //   console.log(e)
  //   this.setState({
  //     visible: false,
  //   })
  // }

  componentDidMount() {
    this.props.getBills(this.props.tripId)
  }

  render() {
    console.log('props', this.props)

    return (
      <span>
        <a onClick={this.showModal}>{this.props.text}</a>
        <Modal
          title="Update Row"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <Form
              // labelCol={{span: 4}}
              // wrapperCol={{span: 14}}
              // layout="horizontal"
              initialValues={{plan: 'new'}}
              size="small"
              onFinish={this.handleSubmit}
            >
              <Form.Item label="Plan" name="plan">
                <Select>
                  {this.props.bills
                    .filter((bill) => bill.planId === this.props.record.key)
                    .map((bill) => {
                      return (
                        <Select.Option value={bill.id} key={bill.id}>
                          {bill.plan.description}
                          {bill.note}
                        </Select.Option>
                      )
                    })}
                  <Select.Option value="new">New Bill</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Amount" name="amount">
                <Input />
              </Form.Item>
              <Form.Item label="Payer" name="payer">
                <Input />
              </Form.Item>
              <Form.Item label="Memo" name="memo">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </span>
    )
  }
}

const mapState = (state) => {
  return {
    bills: state.bills,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBills: (tripId) => dispatch(fetchBills(tripId)),
    postBill: (bill, tripId) => dispatch(postBill(bill, tripId)),
    // getMyTransactions: (tripId) => dispatch(fetchMyTransactions(tripId)),
    // getPlans: (tripId) => dispatch(fetchPlans(tripId)),
  }
}

export default connect(mapState, mapDispatch)(UpdateRow)
