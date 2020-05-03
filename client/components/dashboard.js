import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Expenses from './expenses'
import {CaretRightOutlined} from '@ant-design/icons'
import {Layout, Collapse} from 'antd'
const {Header, Footer, Content} = Layout

const {Panel} = Collapse

export class Dashboard extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Layout>
          <Header id="header">
            <h2>3 Nights in Paris With Jim</h2>
          </Header>
          <Content>
            <Collapse
              accordion
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({isActive}) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel header="Action Tracker" key="1">
                <p>hey</p>
              </Panel>
              <Panel header="Itinerary" key="2">
                <p>hey</p>
              </Panel>
              <Panel header="Expenses" key="3">
                <Expenses />
              </Panel>
            </Collapse>
          </Content>
          <Footer id="footer"> Footer </Footer>
        </Layout>
      </div>
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
  }
}

export default connect(mapState, mapDispatch)(Dashboard)
