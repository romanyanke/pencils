import React from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import Filter from '../Filter'
import { useFilter } from '../Filter/Filter.hooks'
import Gallery from '../Gallery'
import Loader from '../Loader'
import Map from '../Map'
import PageTitle from '../PageTitle'
import PencilInfo from '../PencilInfo'
import TagHeader from '../PencilInfo/TagHeader'
import { useTaxonomyRequest } from '../Taxonomy/Taxonomy.hooks'
import { appMessages } from './App.messages'

const App = () => {
  const [{ tag }] = useFilter()
  const { pending, fulfilled, rejected } = useTaxonomyRequest()

  return (
    <IntlProvider locale="ru" defaultLocale="ru">
      {fulfilled ? (
        <div className="App">
          <BrowserRouter>
            <PageTitle />
            <PencilInfo />
            <nav className="App-block">
              <Filter />
            </nav>
            <section className="App-block">{tag ? <TagHeader /> : <Map />}</section>
            <main className="App-block">
              <Gallery />
            </main>
          </BrowserRouter>
        </div>
      ) : (
        <div className="App-loading">
          {pending && <Loader />}
          {rejected && (
            <button onClick={() => window.location.reload()}>
              <FormattedMessage {...appMessages.error} />
            </button>
          )}
        </div>
      )}
    </IntlProvider>
  )
}

export default App
