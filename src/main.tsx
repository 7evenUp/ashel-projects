import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

import "./styles.css"
import "./book-materials.css"
import "./components/table-scenery.css"
import "./components/IntroSpread/intro-spread.css"
import "./components/PersonalSpread/personal-spread.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
