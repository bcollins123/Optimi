import { Container } from "@mui/material";
import InputTable from "./components/InputTable";
import OutputTable from "./components/OutputTable";
import useFetch from "./hooks/useFetch";

function App() {
  const { isLoading, apiData } = useFetch("transaction.json");

  return (
    <Container maxWidth="sm" sx={{paddingY: 4}}>
      <InputTable isLoading={isLoading} data={apiData} />
      <OutputTable isLoading={isLoading} data={apiData} />
    </Container>
  );
}

export default App;
