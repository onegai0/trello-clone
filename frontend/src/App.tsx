import './App.css'
import { TodoList } from './components/TodoList'

function App() {

  return (
    <>


      <section id="header">

        <a href="https://www.youtube.com/@onegai_01" className="text-button">Ooka</a>


        <div id="social">
          <ul>
            <li>
              <a href="https://github.com/onegai0" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>

      </section>

      <section id="center">
        <div>
          <TodoList />
        </div>
      </section>

    </>
  )
}

export default App
