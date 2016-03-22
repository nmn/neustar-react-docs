import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Marked from 'react-marked'
import { config } from 'config'
import Frame from 'react-frame-component'
import Spinner from '../../../commonComponents/Spinner'

const cssLink = <link rel="stylesheet" href="https://dashboard.p1.neustar.biz/manage/styles/main.css" />


export default class SpinnerDocs extends Component {
  render () {
    return (
      <DocumentTitle title={`Spinner | ${config.siteTitle}`}>
        <div>
          <Marked component="div">
          {`
## Spinner

A simple component to show a loading spinner

\`\`\`
  <Spinner />
  <div style={{ textAlign: 'center' }}>
    <Spinner />
  </div>
\`\`\`
          `}
          </Marked>
          <Frame head={cssLink}>
            <Spinner />
            <div style={{ textAlign: 'center' }}>
              <Spinner />
            </div>
          </Frame>
        </div>
      </DocumentTitle>
    )
  }
}

SpinnerDocs.metadata = () => ({ title: 'Spinner' })

/* <link rel="stylesheet" href="https://dashboard.p1.neustar.biz/manage/styles/main.css" /> */
