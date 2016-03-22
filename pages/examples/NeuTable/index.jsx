import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Marked from 'react-marked'
import { config } from 'config'
import Frame from 'react-frame-component'
import NeuTable from '../../../commonComponents/NeuTable'

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
## NeuTable

\`NeuTable\` is a simple component that abstracts away most of the work involved
when rendering tables on the Neustar websites.

This component is a drop-in replacement for \`ng-table\`.

That said it does more that \`ng-table\` ever did.

In the default case, you should be able to pass \`NeuTable\` a single prop
called data, which in an array of objects and it should render a table in
place.

This componenent will have paging and sorting buil-in. There are also simple
ways to take control of the rendering of individual cells, or customize
the columns that are shown.

\`\`\`javascript
const NeuTable = require('../commonComponent/NeuTable');

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
  return <NeuTable data={data} />
}

module.exports = TableTest
\`\`\`
          `}
          </Marked>
          <Frame head={cssLink}>
            <NeuTable data={data} />
          </Frame>
          <Marked component="div">
          {`
## Props:

- **data :** \`Array<Object>\`. *(required)*

  The data to be rendered in the table. The union of all the keynames found in the
  objects will be used for the columns and the values for the values in the cells.

  If some key is found in some of the objects but not in others, the column will be
  rendered, but the missing values will render an empty cell.

  All this behaviour can be customized.

- **lengths :** \`Array<numbers>\` *(default: \`[10, 25, 50, 100]\`)*

  The possible page lengths in the table

- **defaultLength :** \`number\` *(default: \`25\`)*

  The length of a page to start with. Make sure that this number is found in the
  lengths prop.

- **resetPageOnProps :** \`boolean\` *(default: \`false\`)*

  Whether to reset back to the first page when the component receives new props.
  When this prop itself is changed, the newer value is considered.

- **resetPageOnOrder :** boolean *(default: \`true\`)*

  Whether to reset back to the first page when the table is ordered by one of the columns.

- **keysToRender :** \`Array<string>\` *(default: infered from data)*

  The columns to be rendered. Generally this refers to a subset of the possible
  keys found the data. However, you *can* pass keys not found in the data to render
  additional columns for edit buttons etc.

  You just have to remember to customise the cell rendering to make those cells appear.

- **unsortableKeys :** \`Array<string>\` *(default: \`[]\`)*

  The column keys that should *not* be sortable.

- **keyTypes :** \`{[key: string]: 'string' | 'number' | 'date'}\` *(default: \`'string'\`)*

  The types for various keys in the data. This prop is used to correctly order columns.
  In the \`SearchWrapper\` component, this same prop can be used to search through the
  data correctly and show the correct type of input depending on the column the user
  is searching on.

- **headRenderers :** \`{[key: string]: (key: string) => string | jsx}\` *(default: identity fn)*

  An object that maps keyNames to functions that transform the renderable value in headers

- **cellRenderers :** \`{[key: string]: (value: string, key: string) => string | jsx}\`

  An object that maps keyNames to functions that transform the renderable value in cells

- **HeadComponent :** \`ReactClass\` *(default: DefaultRenderer)

  The Component used to render table headers. Can be overriden for custom rendering.

  _Deprecated_: Try to use headRenderers where possible.

- **CellComponent :** \`ReactClass\` *(default: DefaultRenderer)

  The Component used to render table cells. Can be overriden for custom rendering

  _Deprecated_: Try to use cellRenderers where possible.

- **onPageChange :** \`(page: number) => void\`

  Callback for when the table page is changed

- **onPageLengthChange :** \`(pageLength: number) => void\`

  Callback for when the table page length is changed

- **onOrder :** \`(keyName: string, reversed: boolean) => void\`

  Callback for when the table ordered by a key

          `}
          </Marked>
        </div>
      </DocumentTitle>
    )
  }
}

NeuTableDocs.metadata = () => ({ title: 'NeuTable' })

/* <link rel="stylesheet" href="https://dashboard.p1.neustar.biz/manage/styles/main.css" /> */
