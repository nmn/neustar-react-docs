import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Marked from 'react-marked'
import { config } from 'config'
import Frame from 'react-frame-component'
import SearchTable from '../../../commonComponents/SearchWrapper'

const cssLink = <link rel="stylesheet" href="https://dashboard.p1.neustar.biz/manage/styles/main.css" />
const data = [
  { a: 1, b: 'Bruce', c: 'Wayne' },
  { a: 2, b: 'Selina', c: 'Kyle' },
  { a: 3, b: 'Edward', c: 'Nigma' },
  { a: 4, b: 'Oswald', c: 'Cobblepot' },
]

for (let i = 0; i < 100; i ++) {
  data.push({
    a: Math.floor(Math.random() * 10000000000),
    b: Math.floor(Math.random() * 10000000000).toString(36),
    c: Math.floor(Math.random() * 10000000000).toString(36),
  })
}

export default class NeuTableDocs extends Component {
  render () {
    return (
      <DocumentTitle title={`NeuTable | ${config.siteTitle}`}>
        <div>
          <Marked component="div">
          {`
## SearchWrapper (*aka* SearchTable)

SearchWrapper as the name suggests is a simple wrapper around NeuTable.

In addition to rendering a table based on your data you, automatically get a
powerful client-side search as well. While there are hooks in place to customize
the search and use a server-side search instead, in most cases, this will work
just fine.

The search uses \`fuzzaldrin\` to provide a powerful fuzzy search. The same one
used by the atom editor. It also let's you use double-quotes to search exact, and
use AND and OR by using the \`+\` and \`|\` characters respectively.

In almost all cases, you would use SearchWrapper instead of using NeuTable
directly.

\`\`\`javascript
const SearchTable = require('../commonComponent/SearchWrapper');

const data = [
  {a: 1, b: 'Bruce', c: 'Wayne'},
  {a: 2, b: 'Selina', c: 'Kyle'},
  {a: 3, b: 'Edward', c: 'Nigma'},
  {a: 4, b: 'Oswald', c: 'Cobblepot'},
]

for (let i = 0; i < 100; i ++) {
  data.push({
    a: Math.floor(Math.random() * 10000000000),
    b: Math.floor(Math.random() * 10000000000).toString(36),
    c: Math.floor(Math.random() * 10000000000).toString(36),
  })
}

// in your render method
function TableTest() {
  return <SearchTable data={data} />
}

module.exports = TableTest
\`\`\`
          `}
          </Marked>
          <Frame head={cssLink}>
            <SearchTable data={data} />
          </Frame>
          <Marked component="div">
          {`
## Props:

- ALL THE PROPS FOR \`NeuTable\`

- **onSearch :** \`(searchParams: {query: string, columnOption: string}) => void\`

  The \`SearchWrapper\` adds this single prop requirement that lets you hijack the
  filtering logic. The callback will be called whenever the user types or changes
  the option.

  The component will stop filtering the data if this callback is provided. As it is
  assumed that you will be handling the filtering the logic on your end and re-rendering
  the table with the new data.
          `}
          </Marked>
        </div>
      </DocumentTitle>
    )
  }
}

NeuTableDocs.metadata = () => ({ title: 'SearchWrapper' })

/* <link rel="stylesheet" href="https://dashboard.p1.neustar.biz/manage/styles/main.css" /> */
