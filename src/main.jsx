import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from "react-router-dom"
import './index.css'
import Root from './routes/Root.jsx'
import About from './routes/About.jsx'
import PokemonTable from './routes/PokemonTable.jsx'
import Pokemon from "./routes/Pokemon.jsx"

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <PokemonTable />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pokemon/:id",
        element: <Pokemon />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
