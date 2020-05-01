import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import {fetchCategories} from '../store/categories'

export class Expenses extends React.Component {
  constructor() {
    super()
    this.category = 0
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getBills()
  }

  handleChange(event) {}

  render() {
    return <h1>Expenses</h1>
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    categories: state.categories,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllProducts: () => dispatch(fetchAllProducts()),
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
