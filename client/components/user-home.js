import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, Avatar} from 'antd'
import {fetchTrips, fetchTrip} from '../store/trips'

import {UserOutlined} from '@ant-design/icons'
import {Layout, Collapse} from 'antd'
const {Header, Footer, Content} = Layout

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  useEffect(() => {
    props.getTrips()
    console.log('user', props.user)
  }, [])

  return (
    <div>
      <Layout>
        <Header id="header">
          <h2>{props.user.nickname}'s Trips</h2>
        </Header>

        <Content>
          {props.trips &&
            props.trips
              .filter(
                (trip) =>
                  trip.users.filter((user) => user.id === props.user.id).length
              )
              .map((trip) => {
                return (
                  <a key={trip.id} href={`/trips/${trip.id}`}>
                    <Card title={trip.title}>
                      <p>
                        {trip.duration} Days in {trip.place.name}
                      </p>
                      <p>{trip.start}</p>
                      <ul>
                        {trip.users.map((user) => {
                          return (
                            <li key={user.id}>
                              <Avatar size="small" icon={<UserOutlined />} />
                              {user.nickname}
                            </li>
                          )
                        })}
                      </ul>
                    </Card>
                  </a>
                )
              })}
        </Content>
      </Layout>
    </div>
  )
}

/**
 * CONTAINER
 */

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}

const mapState = (state) => {
  return {
    email: state.user.email,
    trips: state.trips,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTrips: () => dispatch(fetchTrips()),
  }
}

export default connect(mapState, mapDispatch)(UserHome)
