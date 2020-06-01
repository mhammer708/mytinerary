import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Expenses from './expenses'
import {fetchTrip} from '../store/trips'
import {CaretRightOutlined} from '@ant-design/icons'
import {Layout, Collapse} from 'antd'
const {Header, Footer, Content} = Layout

const {Panel} = Collapse

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getTrip(this.props.match.params.tripId)
  }

  render() {
    if (this.props) {
      return (
        <div>
          <Layout>
            <Header id="header">
              <h2>
                {this.props.trips[0]
                  ? `${this.props.trips[0].duration} Days in
                    ${this.props.trips[0].place.name}`
                  : null}
              </h2>
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
                  <p>Coming Soon</p>
                </Panel>
                <Panel header="Itinerary" key="2">
                  <p>Coming Soon</p>
                </Panel>
                <Panel header="Expenses" key="3">
                  <Expenses tripId={this.props.match.params.tripId} />
                </Panel>
              </Collapse>
            </Content>
            <Footer id="footer"> </Footer>
          </Layout>
        </div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    bills: state.bills,
    trips: state.trips,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getBills: (tripId) => dispatch(fetchBills(tripId)),
    getTrip: (tripId) => dispatch(fetchTrip(tripId)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(Dashboard))
