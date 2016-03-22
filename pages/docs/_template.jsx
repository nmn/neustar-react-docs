import React from 'react'
import { Link } from 'react-router'
import { Breakpoint } from 'react-responsive-grid'
import find from 'lodash/find'
import { link } from 'gatsby-helpers'
import { config } from 'config'

import typography from 'utils/typography'
const { rhythm } = typography

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  handleTopicChange (e) {
    return this.context.router.push(e.target.value)
  },

  render () {
    const childPages = config.docPages.map((p) => {
      const page = find(this.props.route.pages, (_p) => _p.path === p)
      return {
        title: page.data.title,
        path: page.path,
      }
    })
    const docOptions = childPages.map((child) =>
      <option
        key={link(child.path)}
        value={link(child.path)}
      >
        {child.title}
      </option>

    )
    const docPages = childPages.map((child) => {
      const isActive = link(child.path) === this.props.location.pathname
      return (
        <li
          key={child.path}
          style={{
            marginBottom: rhythm(1/2),
          }}
        >
          <Link
            to={link(child.path)}
            style={{
              textDecoration: 'none',
            }}
          >
            {isActive ? <strong>{child.title}</strong> : child.title }
          </Link>
        </li>
      )
    })

    return (
      <div>
        <Breakpoint minWidth={700}>
          <div
            style={{
              overflowY: 'auto',
              paddingRight: `calc(${rhythm(1/2)} - 1px)`,
              position: 'absolute',
              width: `calc(${rhythm(8)} - 1px)`,
              borderRight: '1px solid lightgrey',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                marginLeft: 0,
                marginTop: rhythm(1/2),
              }}
            >
              {docPages}
            </ul>
          </div>
          <div
            style={{
              padding: `0 ${rhythm(1)}`,
              paddingLeft: `calc(${rhythm(8)} + ${rhythm(1)})`,
            }}
          >
            {this.props.children}
          </div>
        </Breakpoint>
        <Breakpoint maxWidth={700}>
          <strong>Topics:</strong>
          {' '}
          <select
            defaultValue={this.props.location.pathname}
            onChange={this.handleTopicChange}
          >
            {docOptions}
          </select>
          <br />
          <br />
          {this.props.children}
        </Breakpoint>
      </div>
    )
  },
})
