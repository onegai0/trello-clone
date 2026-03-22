import './App.css'
import { TodoList } from './components/TodoList'

function App() {

  return (
    <>
      <section id="center">
        <div>
          <h1>Onegai ToDo</h1>
        </div>
        <div>
          <TodoList />
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
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
    </>
  )
}

export default App
