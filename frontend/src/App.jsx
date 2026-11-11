import { BrowserRouter } from "react-router-dom";
import AppRouters from "./routers/AppRouters";

function App() {
return (
<BrowserRouter basename="/ToDoList">
<AppRouters />
</BrowserRouter>
);
}

export default App;